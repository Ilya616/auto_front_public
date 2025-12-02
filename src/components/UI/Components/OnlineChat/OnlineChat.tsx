import React, { useState, useEffect, useRef, useCallback } from 'react';
import { List, Card, Badge, Avatar, Input, Button, message, Spin } from 'antd';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { 
  Chat, 
  BuyerChatsResponse, 
  SendMessageResponse, 
  SendMessageVariables, 
  MarkMessagesAsReadResponse, 
  MarkMessagesAsReadVariables 
} from '@/types/chat';
import { GET_BUYER_CHATS } from '../../../../graphql/queries';
import { useQuery, useMutation } from '@apollo/client/react';
import echo from '@/utils/echo';
import { SEND_MESSAGE, MARK_MESSAGES_AS_READ } from '@/graphql/mutations';
import { getCurrentUserId, getCurrentUserName, updateUserCache } from '@/utils/user';
import CreateChatButton from '../CreateChatButton/CreateChatButton';

const OnlineChat: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Загружаем пользователя один раз при монтировании
  useEffect(() => {
    const loadUser = async () => {
      setLoadingUser(true);
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error('❌ Токен не найден');
          message.error('Пожалуйста, войдите в систему');
          setLoadingUser(false);
          return;
        }
        
        // Запрашиваем данные пользователя с сервера
        const response = await fetch(`${import.meta.env.VITE_BACK_API}/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          console.log('✅ Получен пользователь:', userData.id, userData.name);
          
          // Обновляем кэш
          updateUserCache(userData);
          setCurrentUser(userData);
        } else {
          console.error('❌ Ошибка получения пользователя:', response.status);
          // Пробуем получить из localStorage как fallback
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            setCurrentUser(user);
          } else {
            message.error('Ошибка загрузки данных пользователя');
          }
        }
      } catch (error) {
        console.error('❌ Ошибка загрузки пользователя:', error);
        message.error('Ошибка загрузки данных пользователя');
      } finally {
        setLoadingUser(false);
      }
    };
    
    loadUser();
  }, []);

  const currentUserId = currentUser?.id?.toString();
  const currentUserName = currentUser?.name || 'Гость';

  const { 
    data: chatsData, 
    loading: chatsLoading, 
    error: chatsError, 
    refetch 
  } = useQuery<BuyerChatsResponse>(GET_BUYER_CHATS, {
    skip: !currentUserId || loadingUser,
  });

  const [sendMessage, { loading: sending }] = useMutation<SendMessageResponse, SendMessageVariables>(SEND_MESSAGE);
  const [markMessagesAsReadMutation, { loading: markingAsRead }] = useMutation<
    MarkMessagesAsReadResponse, 
    MarkMessagesAsReadVariables
  >(MARK_MESSAGES_AS_READ);

  // Автопрокрутка к последнему сообщению
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  // Загружаем чаты БЕЗ изменения имен отправителей
  useEffect(() => {
    if (chatsData?.buyerChats && currentUserId) {
      // НЕ МЕНЯЕМ ИМЕНА ОТПРАВИТЕЛЕЙ - оставляем как есть с сервера
      setChats(chatsData.buyerChats);
      
      if (selectedChat) {
        const currentChat = chatsData.buyerChats.find(chat => chat.id === selectedChat.id);
        if (currentChat) {
          setLocalMessages([...currentChat.messages]);
        }
      }
    }
  }, [chatsData, selectedChat, currentUserId]);

  // Обработчик WebSocket событий
  useEffect(() => {
    if (!selectedChat || !currentUserId) return;
    
    const channelName = `chat.${selectedChat.id}`;
    console.log(`🔄 Подписываюсь на канал: ${channelName}`);
    
    try {
      const channel = echo.private(channelName);
      
      channel.subscribed(() => {
        console.log(`✅ УСПЕШНО ПОДПИСАЛСЯ на приватный канал: ${channelName}`);
      });
      
      // Слушаем NewMessage
      channel.listen('.NewMessage', (e: any) => { 
        console.log('📨 NewMessage получено:', e);
        
        if (e.message) {
          setLocalMessages(prev => {
            // Проверяем, нет ли уже такого сообщения
            const exists = prev.some(msg => msg.id === e.message.id);
            if (exists) return prev;
            
            const withoutTemp = prev.filter(msg => !isTempMessage(msg));
            
            // НЕ МЕНЯЕМ ИМЯ ОТПРАВИТЕЛЯ - оставляем как пришло с сервера
            return [...withoutTemp, e.message];
          });
        }
      });
      
      // Слушаем MessageRead
      channel.listen('.MessageRead', (e: any) => {
        console.log('👁️ MessageRead получено:', e);
        
        if (e.message) {
          setLocalMessages(prev => 
            prev.map(msg => 
              msg.id === e.message.id 
                ? { ...msg, read: true, updated_at: e.message.updated_at || new Date().toISOString() }
                : msg
            )
          );
        }
      });
      
      channel.error((error: any) => {
        console.error('❌ Ошибка подписки на канал:', error);
      });

      return () => {
        console.log(`🔄 Отписываюсь от канала ${channelName}`);
        channel.stopListening('.NewMessage');
        channel.stopListening('.MessageRead');
        echo.leave(channelName);
      };
    } catch (error: any) {
      console.error('❌ Ошибка создания канала:', error);
    }
  }, [selectedChat, currentUserId]);

  // Мониторинг WebSocket подключения
  useEffect(() => {
    console.log('🔌 OnlineChat: Начинаю отслеживание статуса WebSocket');

    const handleConnected = () => {
      console.log('✅ WebSocket подключен');
      setIsConnected(true);
    };

    const handleDisconnected = () => {
      console.log('❌ WebSocket отключен');
      setIsConnected(false);
    };

    echo.connector.pusher.connection.bind('connected', handleConnected);
    echo.connector.pusher.connection.bind('disconnected', handleDisconnected);

    if (echo.connector.pusher.connection.state === 'connected') {
      setIsConnected(true);
    }

    return () => {
      echo.connector.pusher.connection.unbind('connected', handleConnected);
      echo.connector.pusher.connection.unbind('disconnected', handleDisconnected);
    };
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || !currentUserId) {
      message.warning('Введите сообщение');
      return;
    }

    try {
      // Оптимистичное обновление
      const tempMessage = {
        id: `temp-${Date.now()}`,
        content: newMessage.trim(),
        created_at: new Date().toISOString(),
        read: false,
        sender: { 
          id: currentUserId, 
          name: currentUserName 
        },
        chat_id: selectedChat.id
      };

      setLocalMessages(prev => [...prev, tempMessage]);
      setNewMessage('');

      // ✅ ВЫЗОВ МУТАЦИИ
      const result = await sendMessage({
        variables: {
          chat_id: selectedChat.id.toString(),
          content: newMessage.trim()
        }
      });

      console.log('✅ МУТАЦИЯ УСПЕШНА:', result);

      if (result.data?.sendMessage) {
        console.log('💾 Сообщение сохранено в БД, ID:', result.data.sendMessage.id);
        // WebSocket событие само обновит сообщение
      }

    } catch (error: any) {
      console.error('❌ ОШИБКА МУТАЦИИ:', error);
      message.error('Ошибка отправки: ' + error.message);
      
      // Откатываем оптимистичное обновление
      setLocalMessages(prev => prev.filter(msg => !isTempMessage(msg)));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectChat = useCallback(async (chat: Chat) => {
    setSelectedChat(chat);
    
    // НЕ МЕНЯЕМ ИМЕНА ОТПРАВИТЕЛЕЙ - оставляем как есть с сервера
    setLocalMessages([...chat.messages]);
    setNewMessage('');

    if (currentUserId) {
      await handleMarkMessagesAsRead(chat.id);
    }
  }, [currentUserId]);

  const handleMarkMessagesAsRead = async (chatId: string) => {
    if (!currentUserId) return;
    
    try {
      console.log(`👁️ Отмечаю сообщения в чате ${chatId} как прочитанные`);
      
      const result = await markMessagesAsReadMutation({
        variables: { chat_id: chatId },
        onError: (error) => {
          console.error('❌ GraphQL ошибка:', error);
          if (error.message.includes('Unauthenticated')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.reload();
          }
        }
      });
      
      if (result.data?.markMessagesAsRead?.success) {
        console.log(`✅ Отмечено ${result.data.markMessagesAsRead.count} сообщений как прочитанные`);
      }
      
    } catch (error) {
      console.error('❌ Ошибка отметки сообщений прочитанными:', error);
    }
  };
  
  const getSenderName = (message: any): string => {
    if (!message?.sender) return 'Неизвестный';
    // Просто возвращаем имя отправителя как есть
    return message.sender.name || 'Неизвестный';
  };

  const isOwnMessage = (message: any): boolean => {
    // Сравниваем ID отправителя с currentUserId
    return message?.sender?.id?.toString() === currentUserId;
  };

  const isTempMessage = (message: any): boolean => {
    return message?.id && typeof message.id === 'string' && message.id.startsWith('temp-');
  };

  const enhancedChats = chats.map(chat => ({
    ...chat,
    lastMessage: chat.messages[chat.messages.length - 1],
    unreadCount: chat.messages.filter(msg => !msg.read).length
  }));

  const filteredChats = enhancedChats.filter(chat => 
    chat.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.car_card?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loadingUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Загрузка данных пользователя..." />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <h3>Пользователь не авторизован</h3>
        <p>Токен: {localStorage.getItem('token') ? '✅ есть' : '❌ нет'}</p>
        <Button type="primary" onClick={() => window.location.reload()}>
          Обновить страницу
        </Button>
      </div>
    );
  }

  if (chatsLoading) return <div>Загрузка чатов...</div>;
  if (chatsError) return <div>Ошибка загрузки чатов: {chatsError.message}</div>;

  return (
    <div style={{ display: 'flex', height: '100%', gap: 16, position: 'relative' }}>
      {/* Кнопка отладки */}
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
        <Button 
          size="small" 
          onClick={() => {
            console.log('🔍 Отладка пользователя:', {
              currentUserId,
              currentUserName,
              localStorageToken: localStorage.getItem('token'),
              localStorageUser: localStorage.getItem('user'),
            });
          }}
        >
          Отладка
        </Button>
      </div>

      {/* Левая панель - список чатов */}
      <Card 
        title="Мои чаты" 
        style={{ width: 400, display: 'flex', flexDirection: 'column' }}
        styles={{
          body: { 
            padding: 0,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }
        }}
      >
        {/* Статус подключения */}
        <div style={{ 
          padding: '8px', 
          background: isConnected ? '#f6ffed' : '#fff2f0',
          borderBottom: '1px solid #d9d9d9',
          fontSize: '12px',
          marginBottom: '16px',
          flexShrink: 0
        }}>
          <div>WebSocket: <strong>{isConnected ? '✅ Подключен' : '❌ Отключен'}</strong></div>
          <div style={{ fontSize: '10px', marginTop: '4px' }}>
            Пользователь: {currentUserName} (ID: {currentUserId})
          </div>
        </div>

        <div style={{ padding: '0 16px', flexShrink: 0 }}>
          <CreateChatButton onChatCreated={refetch} />
          <Input
            placeholder="Поиск по продавцам..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            style={{ marginBottom: 16 }}
          />
        </div>
        
        {/* Список чатов */}
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          <List
            dataSource={filteredChats}
            loading={chatsLoading}
            renderItem={(chat: Chat) => (
              <List.Item
                key={chat.id}
                style={{
                  cursor: 'pointer',
                  background: selectedChat?.id === chat.id ? '#f0f8ff' : 'white',
                  padding: '12px',
                  border: selectedChat?.id === chat.id ? '1px solid #1890ff' : '1px solid transparent'
                }}
                onClick={() => handleSelectChat(chat)}
              >
                <List.Item.Meta
                  avatar={
                    <Badge count={chat.unreadCount} size="small">
                      <Avatar 
                        icon={<UserOutlined />} 
                        src={chat.seller.avatar} 
                      />
                    </Badge>
                  }
                  title={chat.seller.name}
                  description={
                    <div>
                      <div style={{ 
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        {chat.car_card?.description || 'Объявление'}
                      </div>
                      {chat.lastMessage && (
                        <>
                          <div style={{ 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            fontSize: '12px'
                          }}>
                            {getSenderName(chat.lastMessage)}: {chat.lastMessage.content}
                          </div>
                          <div style={{ fontSize: '10px', color: '#999' }}>
                            {new Date(chat.lastMessage.created_at).toLocaleString()}
                          </div>
                        </>
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </Card>

      {/* Правая панель - выбранный чат */}
      <Card 
        title={
          selectedChat 
            ? `Чат с ${selectedChat.seller.name}`
            : "Выберите чат"
        }
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        styles={{
          body: { 
            padding: 0,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }
        }}
      >
        {selectedChat ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
            {/* Заголовок */}
            <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
              <h4 style={{ margin: 0 }}>Объявление: {selectedChat.car_card.description}</h4>
              <p style={{ margin: '8px 0 0 0', color: '#666' }}>Цена: {selectedChat.car_card.price} ₽</p>
            </div>

            {/* История сообщений */}
            <div 
              style={{ 
                flex: 1,
                minHeight: 0,
                overflowY: 'auto', 
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {localMessages.map((message) => {
                const messageId = message?.id || `msg-${message?.created_at || Date.now()}-${Math.random()}`;
                const content = message?.content || '';
                const createdAt = message?.created_at || new Date().toISOString();
                const isOwn = isOwnMessage(message);
                
                return (
                  <div 
                    key={messageId}
                    style={{ 
                      padding: '12px', 
                      background: isOwn ? '#e6f7ff' : '#f0f0f0',
                      borderRadius: '8px',
                      alignSelf: isOwn ? 'flex-end' : 'flex-start',
                      maxWidth: '70%'
                    }}
                  >
                    {!isOwn && (
                      <strong style={{ display: 'block', marginBottom: '4px' }}>
                        {getSenderName(message)}:
                      </strong>
                    )}
                    <div>{content}</div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#999', 
                      marginTop: '4px',
                      textAlign: isOwn ? 'right' : 'left'
                    }}>
                      {new Date(createdAt).toLocaleString()}
                      {isTempMessage(message) && ' ⏳'}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Поле ввода сообщения */}
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              padding: '16px', 
              borderTop: '1px solid #f0f0f0',
              flexShrink: 0,
              background: 'white'
            }}>
              <Input.TextArea
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={2}
                style={{ flex: 1 }}
                disabled={sending}
              />
              <Button 
                type="primary" 
                onClick={handleSendMessage}
                loading={sending}
                style={{ alignSelf: 'flex-end', height: 'auto' }}
              >
                Отправить
              </Button>
            </div>
          </div>
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: '#999',
            flexDirection: 'column'
          }}>
            <MessageOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <div>Выберите чат для общения</div>
            <div style={{ marginTop: 8, fontSize: 12 }}>
              WebSocket: {isConnected ? '✅ Подключен' : '❌ Отключен'}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default OnlineChat;
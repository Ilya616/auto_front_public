import React, { useState, useEffect, useRef, useCallback } from 'react';
import { List, Card, Badge, Avatar, Input, Button, message, Spin } from 'antd';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';
import { 
  Chat, 
  SellerChatsResponse, 
  SendMessageResponse, 
  SendMessageVariables, 
  MarkMessagesAsReadResponse, 
  MarkMessagesAsReadVariables  
} from '@/types/chat';
import { GET_SELLER_CHATS } from '@/graphql/queries';
import { SEND_MESSAGE, MARK_MESSAGES_AS_READ } from '@/graphql/mutations';
import { useQuery, useMutation } from '@apollo/client/react';
import echo from '@/utils/echo';
import { getCurrentUserId, getCurrentUserName, updateUserCache } from '@/utils/user';
import styles from './SellerChat.module.scss';

const SellerChatInterface: React.FC = () => {
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
        
        const response = await fetch(`${import.meta.env.VITE_BACK_API}/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          console.log('✅ Получен пользователь:', userData.id, userData.name);
          
          updateUserCache(userData);
          setCurrentUser(userData);
        } else {
          console.error('❌ Ошибка получения пользователя:', response.status);
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

  useEffect(() => {
    if (currentUser && currentUser.role_id !== 2) {
      message.error('Вы должны быть продавцом для доступа к этому разделу');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  }, [currentUser]);

  const currentUserId = currentUser?.id?.toString();
  const currentUserName = currentUser?.name || 'Гость';

  const { 
    data, 
    loading, 
    error, 
    refetch 
  } = useQuery<SellerChatsResponse>(GET_SELLER_CHATS, {
    skip: !currentUserId || loadingUser,
    fetchPolicy: 'network-only',
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

  // Загружаем чаты при получении данных
  useEffect(() => {
    if (data?.sellerChats && currentUserId) {
      console.log('📥 Загружены чаты продавца:', data.sellerChats.length);
      setChats(data.sellerChats);
    }
  }, [data, currentUserId]);

  // Синхронизация сообщений при изменении чатов или выборе чата
  useEffect(() => {
    if (selectedChat) {
      const updatedChat = chats.find(chat => chat.id === selectedChat.id);
      if (updatedChat) {
        console.log('🔄 Синхронизирую сообщения для чата:', selectedChat.id, 'сообщений:', updatedChat.messages.length);
        setLocalMessages([...updatedChat.messages]);
      }
    }
  }, [chats, selectedChat]);

  // Обработчик WebSocket событий для чата
  useEffect(() => {
    if (!selectedChat || !currentUserId) return;
    
    const channelName = `chat.${selectedChat.id}`;
    console.log(`🔄 Подписываюсь на канал чата: ${channelName}`);
    
    try {
      const channel = echo.private(channelName);
      
      channel.subscribed(() => {
        console.log(`✅ УСПЕШНО ПОДПИСАЛСЯ на канал чата: ${channelName}`);
      });
      
      channel.listen('.NewMessage', (e: any) => { 
        console.log('📨 NewMessage получено в канале чата:', e);
        
        if (e.message) {
          setLocalMessages(prev => {
            const exists = prev.some(msg => msg.id === e.message.id);
            if (exists) return prev;
            
            const withoutTemp = prev.filter(msg => !isTempMessage(msg));
            return [...withoutTemp, e.message];
          });
          
          setChats(prev => prev.map(chat => {
            if (chat.id === selectedChat.id) {
              const updatedMessages = [...(chat.messages || []), e.message];
              return {
                ...chat,
                messages: updatedMessages,
                lastMessage: e.message
              };
            }
            return chat;
          }));
        }
      });
      
      channel.listen('.MessageRead', (e: any) => {
        console.log('👁️ MessageRead получено:', e);
        
        if (e.message) {
          setLocalMessages(prev => 
            prev.map(msg => 
              msg.id === e.message.id 
                ? { 
                    ...msg, 
                    read: true,
                    updated_at: e.message.updated_at || new Date().toISOString()
                  }
                : msg
            )
          );
        }
      });
      
      channel.error((error: any) => {
        console.error('❌ Ошибка подписки на канал чата:', error);
      });

      return () => {
        console.log(`🔄 Отписываюсь от канала ${channelName}`);
        channel.stopListening('.NewMessage');
        channel.stopListening('.MessageRead');
        echo.leave(channelName);
      };
    } catch (error: any) {
      console.error('❌ Ошибка создания канала чата:', error);
    }
  }, [selectedChat, currentUserId]);

  // Обработчик WebSocket событий для личного канала (новые чаты)
  useEffect(() => {
    if (!currentUserId) return;
    
    const channelName = `user.${currentUserId}`;
    console.log(`🎧 Подписываюсь на личный канал: ${channelName}`);
    
    try {
      const channel = echo.private(channelName);
      
      channel.subscribed(() => {
        console.log(`✅ Подписан на личный канал: ${channelName}`);
      });
      
      channel.listen('.ChatCreated', (e: any) => { 
        console.log('🎯 ChatCreated event received:', e);
        
        if (e.chat) {
          const newChat: Chat = {
            id: e.chat.id,
            seller: e.chat.seller,
            buyer: e.chat.buyer,
            car_card: e.chat.car_card,
            messages: e.chat.messages || [],
            lastMessage: e.chat.messages?.[e.chat.messages.length - 1] || null,
            unreadCount: e.chat.unreadCount || 0,
            created_at: e.chat.created_at
          };
          
          setChats(prev => {
            const exists = prev.some(chat => chat.id === newChat.id);
            if (exists) {
              console.log('⚠️ Чат уже существует в списке, обновляю:', newChat.id);
              return prev.map(chat => 
                chat.id === newChat.id ? newChat : chat
              );
            }
            
            console.log('➕ Добавляем новый чат в список:', newChat.id);
            return [newChat, ...prev];
          });
          
          message.success(`Новый чат с ${newChat.buyer?.name || 'покупателем'}`);
        }
      });
      
      return () => {
        console.log(`🎧 Отписываюсь от канала ${channelName}`);
        channel.stopListening('.ChatCreated');
        echo.leave(channelName);
      };
      
    } catch (error: any) {
      console.error('❌ Ошибка создания личного канала:', error);
    }
  }, [currentUserId]);

  // Мониторинг WebSocket подключения
  useEffect(() => {
    console.log('🔌 SellerChatInterface: Начинаю отслеживание статуса WebSocket');

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

      const result = await sendMessage({
        variables: {
          chat_id: selectedChat.id.toString(),
          content: newMessage.trim()
        }
      });

      console.log('✅ Сообщение отправлено:', result);

      if (result.data?.sendMessage) {
        console.log('💾 Сообщение сохранено в БД, ID:', result.data.sendMessage.id);
      }

    } catch (error: any) {
      console.error('❌ ОШИБКА отправки сообщения:', error);
      message.error('Ошибка отправки: ' + error.message);
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
    console.log('🎯 Выбран чат:', chat.id);
    setSelectedChat(chat);
    
    const updatedChat = chats.find(c => c.id === chat.id);
    if (updatedChat) {
      console.log('📥 Загружаю сообщения для чата:', chat.id, 'сообщений:', updatedChat.messages.length);
      setLocalMessages([...updatedChat.messages]);
    } else {
      setLocalMessages([...chat.messages]);
    }
    
    setNewMessage('');

    if (currentUserId) {
      await handleMarkMessagesAsRead(chat.id);
    }
  }, [chats, currentUserId]);

  const handleMarkMessagesAsRead = async (chatId: string) => {
    if (!currentUserId) return;
    
    try {
      console.log(`👁️ Отмечаю сообщения в чате ${chatId} как прочитанные`);
      
      const result = await markMessagesAsReadMutation({
        variables: { chat_id: chatId }
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
    return message.sender.name || 'Неизвестный';
  };

  const isOwnMessage = (message: any): boolean => {
    return message?.sender?.id?.toString() === currentUserId;
  };

  const isTempMessage = (message: any): boolean => {
    return message?.id && typeof message.id === 'string' && message.id.startsWith('temp-');
  };

  const enhancedChats = chats.map(chat => ({
    ...chat,
    lastMessage: chat.messages[chat.messages.length - 1],
    unreadCount: chat.messages.filter(msg => !msg.read && msg.sender?.id?.toString() !== currentUserId).length
  }));

  const filteredChats = enhancedChats.filter(chat => 
    chat.buyer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDebug = () => {
    console.log('🔍 Отладка:', {
      currentUserId,
      currentUserName,
      chatsCount: chats.length,
      chats: chats,
      selectedChatId: selectedChat?.id,
      localMessagesCount: localMessages.length
    });
  };

  if (loadingUser) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" tip="Загрузка данных пользователя..." />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className={styles.unauthorizedContainer}>
        <h3>Пользователь не авторизован</h3>
        <p>Токен: {localStorage.getItem('token') ? '✅ есть' : '❌ нет'}</p>
        <Button type="primary" onClick={() => window.location.reload()}>
          Обновить страницу
        </Button>
      </div>
    );
  }

  if (loading) return <div>Загрузка чатов...</div>;
  if (error) return <div>Ошибка загрузки чатов: {error.message}</div>;

  return (
    <div className={styles.sellerChat}>
      <div className={styles.sellerChat__debugButton}>
        <Button size="small" onClick={handleDebug}>Отладка</Button>
      </div>

      {/* Список чатов */}
      <div className={styles.sellerChat__sidebar}>
        <Card title={`Чаты с покупателями (${chats.length})`} className={styles.chatsCard}>
          <div className={styles.chatsCard__body}>
            <div className={`${styles.chatsCard__status} ${!isConnected ? styles['chatsCard__status--disconnected'] : ''}`}>
              <div>WebSocket: <strong>{isConnected ? '✅ Подключен' : '❌ Отключен'}</strong></div>
              <div className={styles.chatsCard__userInfo}>
                Пользователь: {currentUserName} (ID: {currentUserId})
              </div>
              <div className={styles.chatsCard__chatsInfo}>
                Чатов: {chats.length}
              </div>
            </div>

            <div className={styles.chatsCard__search}>
              <Input
                placeholder="Поиск по покупателям..."
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: 16 }}
              />
            </div>
            
            <div className={styles.chatsCard__list}>
              {filteredChats.length === 0 ? (
                <div className={styles.emptyState}>
                  <UserOutlined className={styles.emptyState__icon} />
                  <div>Нет чатов с покупателями</div>
                  <div className={styles.emptyState__message}>
                    Покупатели могут начать чат с вами через ваши объявления
                  </div>
                </div>
              ) : (
                <List
                  dataSource={filteredChats}
                  loading={loading}
                  renderItem={(chat: Chat) => (
                    <List.Item
                      className={`${styles.chatList__item} ${selectedChat?.id === chat.id ? styles['chatList__item--selected'] : ''}`}
                      onClick={() => handleSelectChat(chat)}
                    >
                      <List.Item.Meta
                        avatar={
                          <Badge count={chat.unreadCount} size="small">
                            <Avatar icon={<UserOutlined />} src={chat.buyer?.avatar} />
                          </Badge>
                        }
                        title={chat.buyer?.name || 'Неизвестный покупатель'}
                        description={
                          <div>
                            <div className={styles.chatList__description__car}>
                              {chat.car_card?.description || 'Объявление'}
                            </div>
                            {chat.lastMessage && (
                              <>
                                <div className={styles.chatList__description__message}>
                                  {getSenderName(chat.lastMessage)}: {chat.lastMessage.content}
                                </div>
                                <div className={styles.chatList__description__time}>
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
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Область выбранного чата */}
      <div className={styles.sellerChat__chatArea}>
        <Card 
          title={selectedChat ? `Чат с ${selectedChat.buyer?.name || 'покупателем'}` : "Выберите чат"}
          className={styles.chatCard}
        >
          <div className={styles.chatCard__body}>
            {selectedChat ? (
              <>
                <div className={styles.chatCard__header}>
                  <h4 className={styles.chatCard__title}>Объявление: {selectedChat.car_card?.description || 'Нет описания'}</h4>
                  <p className={styles.chatCard__price}>
                    Цена: {selectedChat.car_card?.price || '0'} ₽
                  </p>
                  <p className={styles.chatCard__buyer}>
                    Покупатель: {selectedChat.buyer?.name || 'Неизвестно'}
                  </p>
                </div>

                <div className={styles.chatCard__messages}>
                  {localMessages.length === 0 ? (
                    <div className={styles.emptyState}>
                      <MessageOutlined className={styles.emptyState__icon} />
                      <div>Нет сообщений в этом чате</div>
                      <div className={styles.emptyState__message}>Начните общение первым</div>
                    </div>
                  ) : (
                    localMessages.map((message) => {
                      const messageId = message?.id || `msg-${Date.now()}-${Math.random()}`;
                      const content = message?.content || '';
                      const createdAt = message?.created_at || new Date().toISOString();
                      const isOwn = isOwnMessage(message);
                      
                      return (
                        <div 
                          key={messageId}
                          className={`${styles.message} ${isOwn ? styles['message--own'] : ''}`}
                        >
                          {!isOwn && (
                            <strong className={styles.message__sender}>
                              {getSenderName(message)}:
                            </strong>
                          )}
                          <div>{content}</div>
                          <div className={`${styles.message__time} ${isOwn ? styles['message__time--right'] : styles['message__time--left']}`}>
                            {new Date(createdAt).toLocaleString()}
                            {isTempMessage(message) && <span className={styles.message__temp} />}
                            {isOwn && !message.read && <span className={styles.message__unread} />}
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className={styles.chatCard__inputArea}>
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
              </>
            ) : (
              <div className={styles.emptyState}>
                <MessageOutlined className={styles.emptyState__icon} />
                <div>Выберите чат для начала общения</div>
                <div className={styles.emptyState__message}>
                  WebSocket: {isConnected ? '✅ Подключен' : '❌ Отключен'}
                </div>
                <div className={styles.emptyState__message}>
                  Чатов доступно: {chats.length}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SellerChatInterface;
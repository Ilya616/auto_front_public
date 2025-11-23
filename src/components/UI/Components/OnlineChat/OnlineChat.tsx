import React, { useState, useEffect } from 'react';
import { List, Card, Badge, Avatar, Input, Button, Tabs } from 'antd';
import { MessageOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Chat, Announcement, BuyerChatsResponse } from '@/types/chat';
import { GET_BUYER_CHATS } from '../../../../graphql/queries';
import { useQuery } from '@apollo/client/react';

const OnlineChat: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('chats');

  // Загружаем чаты покупателя
  const { data: chatsData, loading: chatsLoading, error: chatsError } = useQuery<BuyerChatsResponse>(GET_BUYER_CHATS);

  useEffect(() => {
    if (chatsData?.buyerChats) {
      setChats(chatsData.buyerChats);
    }
  }, [chatsData]);

  // Добавьте вычисление lastMessage и unreadCount
  const enhancedChats = chats.map(chat => ({
    ...chat,
    lastMessage: chat.messages[chat.messages.length - 1],
    unreadCount: chat.messages.filter(msg => !msg.read).length
  }));

  const filteredChats = enhancedChats.filter(chat => 
    chat.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.car_card?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (chatsLoading) return <div>Загрузка чатов...</div>;
  if (chatsError) return <div>Ошибка загрузки чатов: {chatsError.message}</div>;

  return (
    <div style={{ display: 'flex', height: '80vh', gap: 16 }}>
      {/* Левая панель - список чатов */}
      <Card 
        title="Мои чаты"
        style={{ width: 400 }}
      >
        <Input
          placeholder="Поиск по продавцам..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        
        <List
          dataSource={filteredChats}
          loading={chatsLoading}
          renderItem={(chat: Chat) => (
            <List.Item
              style={{
                cursor: 'pointer',
                background: selectedChat?.id === chat.id ? '#f0f8ff' : 'white',
                padding: '12px',
                border: selectedChat?.id === chat.id ? '1px solid #1890ff' : '1px solid transparent'
              }}
              onClick={() => setSelectedChat(chat)}
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
                    <div style={{ 
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      fontSize: '12px'
                    }}>
                      {chat.lastMessage?.content || 'Нет сообщений'}
                    </div>
                    <div style={{ fontSize: '10px', color: '#999' }}>
                      {chat.lastMessage?.createdAt || ''}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Правая панель - выбранный чат */}
      <Card 
        title={
          selectedChat 
            ? `Чат с ${selectedChat.seller.name}`
            : "Выберите чат"
        }
        style={{ flex: 1 }}
        bodyStyle={{ 
          padding: selectedChat ? '0 10px 10px 10px' : 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {selectedChat ? (
          <div>
            <h4>Объявление: {selectedChat.car_card.description}</h4>
            <p>Цена: {selectedChat.car_card.price} ₽</p>
            <div style={{ marginTop: 16 }}>
              <h4>История сообщений:</h4>
              {selectedChat.messages.map(message => (
                <div key={message.id} style={{ 
                  padding: 8, 
                  marginBottom: 8,
                  background: message.sender.id === selectedChat.seller.id ? '#f0f0f0' : '#e6f7ff',
                  borderRadius: 8
                }}>
                  <strong>{message.sender.name}:</strong> {message.content}
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    {message.createdAt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: '#999'
          }}>
            <MessageOutlined style={{ fontSize: 48, marginBottom: 16 }} />
            <div>Выберите чат для общения</div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default OnlineChat;
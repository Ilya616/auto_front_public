// SellerChatInterface.jsx
import React, { useState, useEffect } from 'react';
import { List, Card, Badge, Avatar, Input, Button } from 'antd';
import { MessageOutlined, UserOutlined } from '@ant-design/icons';

const SellerChatInterface = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Загрузка списка чатов
  useEffect(() => {
    // GraphQL запрос для получения чатов продавца
    loadSellerChats();
  }, []);

  const loadSellerChats = async () => {
    // Здесь ваш GraphQL запрос
    const query = `
      query SellerChats {
        chats(role: "seller") {
          id
          buyer {
            id
            name
            avatar
          }
          lastMessage {
            content
            createdAt
          }
          unreadCount
        }
      }
    `;
    // Выполнение запроса...
  };

  const filteredChats = chats.filter(chat => 
    chat.buyer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', height: '80vh', gap: 16 }}>
      {/* Список чатов */}
      <Card title="Чаты с покупателями" style={{ width: 400 }}>
        <Input
          placeholder="Поиск по покупателям..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        
        <List
          dataSource={filteredChats}
          renderItem={chat => (
            <List.Item
              style={{
                cursor: 'pointer',
                background: selectedChat?.id === chat.id ? '#f0f8ff' : 'white',
                padding: '12px'
              }}
              onClick={() => setSelectedChat(chat)}
            >
              <List.Item.Meta
                avatar={
                  <Badge count={chat.unreadCount} size="small">
                    <Avatar icon={<UserOutlined />} src={chat.buyer.avatar} />
                  </Badge>
                }
                title={chat.buyer.name}
                description={
                  <div>
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

      {/* Область выбранного чата */}
      <Card 
        title={selectedChat ? `Чат с ${selectedChat.buyer.name}` : "Выберите чат"}
        style={{ flex: 1 }}
        bodyStyle={{ 
          padding: selectedChat ? '0 10px 10px 10px' : 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {selectedChat ? (
          <AntdChat 
            chatId={selectedChat.id}
            receiverId={selectedChat.buyer.id}
            isSeller={true}
          />
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: '#999'
          }}>
            Выберите чат для начала общения
          </div>
        )}
      </Card>
    </div>
  );
};

export default SellerChatInterface;
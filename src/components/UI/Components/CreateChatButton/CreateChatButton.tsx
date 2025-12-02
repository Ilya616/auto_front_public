import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, List, Card, Avatar, message, Spin, Alert } from 'antd';
import { MessageOutlined, UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_AVAILABLE_SELLERS } from '@/graphql/queries';
import { START_CHAT } from '@/graphql/mutations';
import { SellerWithAnnouncements, AvailableSellersResponse } from '@/types/chat';

const CreateChatButton: React.FC<{ onChatCreated?: () => void }> = ({ onChatCreated }) => {
  const [visible, setVisible] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<SellerWithAnnouncements | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);
  const [creatingChatId, setCreatingChatId] = useState<string | null>(null);

  const { 
    data, 
    loading, 
    error, 
    refetch: refetchSellers 
  } = useQuery<AvailableSellersResponse>(GET_AVAILABLE_SELLERS, {
    skip: !visible,
    fetchPolicy: 'network-only',
  });

  const [startChat, { loading: creating }] = useMutation(START_CHAT, {
    onCompleted: (data) => {
      console.log('✅ Чат создан:', data);
      message.success('Чат успешно создан!');
      
      // Сбрасываем состояния
      setSelectedSeller(null);
      setSelectedAnnouncement(null);
      setCreatingChatId(null);
      setVisible(false);
      
      // Обновляем список продавцов
      refetchSellers();
      
      // Вызываем callback для обновления списка чатов
      if (onChatCreated) {
        setTimeout(() => {
          onChatCreated();
        }, 500);
      }
    },
    onError: (error) => {
      console.error('❌ Ошибка создания чата:', error);
      
      // Проверяем, если чат уже существует
      if (error.message.includes('already exists') || error.message.includes('существует')) {
        message.warning('Чат с этим продавцом уже существует!');
      } else {
        message.error(`Ошибка создания чата: ${error.message}`);
      }
      
      setCreatingChatId(null);
    },
  });

  // Сбрасываем состояния при открытии/закрытии модалки
  useEffect(() => {
    if (visible) {
      setSelectedSeller(null);
      setSelectedAnnouncement(null);
      setCreatingChatId(null);
    }
  }, [visible]);

  const handleCreateChat = useCallback(() => {
    if (!selectedSeller || !selectedAnnouncement) {
      message.warning('Выберите продавца и объявление');
      return;
    }

    const chatId = `${selectedSeller.id}-${selectedAnnouncement.id}`;
    setCreatingChatId(chatId);

    console.log('🔄 Создание чата по объявлению:', {
      announcement_id: selectedAnnouncement.id,
    });

    // Отправляем только announcement_id
    startChat({
      variables: {
        announcement_id: selectedAnnouncement.id,
      },
    });
  }, [selectedSeller, selectedAnnouncement, startChat]);

  const handleCancel = () => {
    if (creating) {
      message.warning('Пожалуйста, дождитесь создания чата');
      return;
    }
    setVisible(false);
  };

  const handleSelectSeller = useCallback((seller: SellerWithAnnouncements) => {
    setSelectedSeller(seller);
    setSelectedAnnouncement(null);
  }, []);

  const handleSelectAnnouncement = useCallback((announcement: any) => {
    setSelectedAnnouncement(announcement);
  }, []);

  // Проверяем, есть ли у выбранного продавца объявления
  const hasAnnouncements = selectedSeller?.announcements && selectedSeller.announcements.length > 0;

  return (
    <>
      <Button
        type="primary"
        icon={<MessageOutlined />}
        onClick={() => setVisible(true)}
        style={{ marginBottom: 16 }}
        size="middle"
      >
        Создать новый чат
      </Button>

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MessageOutlined />
            <span>Создать новый чат</span>
          </div>
        }
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button 
            key="cancel" 
            onClick={handleCancel}
            disabled={creating}
          >
            Отмена
          </Button>,
          <Button
            key="create"
            type="primary"
            loading={creating}
            disabled={!selectedSeller || !selectedAnnouncement || creating}
            onClick={handleCreateChat}
          >
            {creating ? 'Создание...' : 'Создать чат'}
          </Button>,
        ]}
        width={800}
        closable={!creating}
        maskClosable={!creating}
        destroyOnClose
      >
        {error && (
          <Alert
            message="Ошибка загрузки продавцов"
            description={
              <div>
                {error.message}
                <div style={{ marginTop: 8 }}>
                  <Button 
                    type="link" 
                    size="small" 
                    onClick={() => refetchSellers()}
                    loading={loading}
                  >
                    Попробовать снова
                  </Button>
                </div>
              </div>
            }
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        
        <div style={{ display: 'flex', gap: 16, minHeight: 400 }}>
          {/* Левая панель - список продавцов */}
          <Card 
            title={
              <div>
                Продавцы
                {data && (
                  <span style={{ fontSize: 12, fontWeight: 'normal', marginLeft: 8 }}>
                    ({data.availableSellers?.length || 0})
                  </span>
                )}
              </div>
            }
            style={{ flex: 1 }}
            styles={{
              body: { padding: 0 }
            }}
          >
            {loading ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <Spin tip="Загрузка продавцов..." />
              </div>
            ) : (
              <List
                dataSource={data?.availableSellers || []}
                renderItem={(seller: SellerWithAnnouncements) => (
                  <List.Item
                    style={{
                      cursor: 'pointer',
                      background: selectedSeller?.id === seller.id ? '#f0f8ff' : 'white',
                      padding: '12px',
                      border: selectedSeller?.id === seller.id ? '1px solid #1890ff' : '1px solid transparent',
                      opacity: creating ? 0.5 : 1
                    }}
                    onClick={() => !creating && handleSelectSeller(seller)}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar 
                          icon={<UserOutlined />} 
                          src={seller.avatar} 
                          size="default"
                        />
                      }
                      title={
                        <div style={{ fontWeight: 600 }}>
                          {seller.name}
                        </div>
                      }
                      description={
                        <div style={{ fontSize: 12 }}>
                          <div>{seller.email}</div>
                          <div style={{ marginTop: 4 }}>
                            Объявлений: {seller.announcements?.length || 0}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
                locale={{ emptyText: 'Нет доступных продавцов' }}
              />
            )}
          </Card>

          {/* Правая панель - объявления выбранного продавца */}
          <Card 
            title={
              selectedSeller 
                ? `Объявления ${selectedSeller.name}`
                : "Выберите продавца"
            }
            style={{ flex: 1 }}
            styles={{
              body: { padding: 0 }
            }}
          >
            {selectedSeller ? (
              hasAnnouncements ? (
                <List
                  dataSource={selectedSeller.announcements}
                  renderItem={(announcement: any) => {
                    const isSelected = selectedAnnouncement?.id === announcement.id;
                    const isCreating = creating && creatingChatId === `${selectedSeller.id}-${announcement.id}`;
                    
                    return (
                      <List.Item
                        style={{
                          cursor: creating ? 'not-allowed' : 'pointer',
                          background: isSelected ? '#f0f8ff' : 'white',
                          padding: '12px',
                          border: isSelected ? '1px solid #1890ff' : '1px solid transparent',
                          opacity: creating && !isCreating ? 0.5 : 1
                        }}
                        onClick={() => !creating && handleSelectAnnouncement(announcement)}
                      >
                        <List.Item.Meta
                          title={
                            <div style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              alignItems: 'flex-start'
                            }}>
                              <div style={{ fontSize: 14, fontWeight: 500 }}>
                                {announcement.description}
                              </div>
                              {isCreating && (
                                <Spin size="small" />
                              )}
                            </div>
                          }
                          description={
                            <div style={{ 
                              fontSize: 13, 
                              fontWeight: 600, 
                              color: '#1890ff',
                              marginTop: 4
                            }}>
                              {announcement.price?.toLocaleString('ru-RU')} ₽
                            </div>
                          }
                        />
                      </List.Item>
                    );
                  }}
                />
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: 40, 
                  color: '#999',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16
                }}>
                  <ExclamationCircleOutlined style={{ fontSize: 24 }} />
                  <div>У этого продавца нет объявлений</div>
                </div>
              )
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: 40, 
                color: '#999',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16
              }}>
                <UserOutlined style={{ fontSize: 24 }} />
                <div>Выберите продавца для просмотра его объявлений</div>
              </div>
            )}
          </Card>
        </div>
        
        {selectedAnnouncement && selectedSeller && (
          <Alert
            message="Готово к созданию чата"
            description={
              <div>
                <strong>Чат с {selectedSeller.name}</strong> по объявлению "{selectedAnnouncement.description}"
                <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                  <div>Продавец: {selectedSeller.name}</div>
                  <div>Цена: {selectedAnnouncement.price?.toLocaleString('ru-RU')} ₽</div>
                  {creating && (
                    <div style={{ marginTop: 4, color: '#faad14' }}>
                      <Spin size="small" /> Создание чата...
                    </div>
                  )}
                </div>
              </div>
            }
            type="success"
            showIcon
            style={{ marginTop: 16 }}
          />
        )}

        {creating && (
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <Spin tip="Создание чата..." size="large" />
          </div>
        )}
      </Modal>
    </>
  );
};

export default CreateChatButton;
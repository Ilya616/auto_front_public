import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { MessageOutlined, CloseOutlined } from '@ant-design/icons';
import OnlineChat from './OnlineChat';

const BuyerChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        style={{ 
          position: 'fixed', 
          bottom: 20, 
          left: 20, 
          zIndex: 1000 
        }}
        onClick={handleToggle}
      />
    );
  }

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Мои чаты</span>
          <Button 
            type="text" 
            icon={<CloseOutlined />} 
            onClick={handleClose}
          />
        </div>
      }
      style={{
        width: 1000,
        height: 700,
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
      bodyStyle={{ padding: 0, height: 'calc(100% - 57px)' }}
    >
      <OnlineChat />
    </Card>
  );
};

export default BuyerChatButton;
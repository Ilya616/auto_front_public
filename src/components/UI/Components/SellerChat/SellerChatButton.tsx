import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { MessageOutlined, CloseOutlined } from '@ant-design/icons';
import SellerChat from './SellerChat';

const SellerChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          right: 20, 
          zIndex: 1000 
        }}
        onClick={() => setIsOpen(true)}
      />
    );
  }

  return (
    <Card
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Чаты продавца</span>
          <Button 
            type="text" 
            icon={<CloseOutlined />} 
            onClick={() => setIsOpen(false)}
          />
        </div>
      }
      style={{
        width: 800,
        height: 600,
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}
      styles={{
        body: { 
          padding: 0, 
          height: 'calc(100% - 57px)' 
        }
      }}
    >
      <SellerChat />
    </Card>
  );
};

export default SellerChatButton;
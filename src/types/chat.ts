export interface Chat {
  id: string;
  seller: User;
  buyer: User;
  car_card: Announcement;
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  created_at: string;
}

export interface Announcement {
  id: string;
  title?: string;
  description?: string;
  price: number;
  year?: number;
  image?: string;
  seller: User;
}

export interface Message {
  id: string;
  content: string;
  created_at: string;
  read: boolean;
  sender: User;
  chat_id?: string;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Seller {
  id: string;
  name: string;
  avatar?: string;
}

export interface SellerWithAnnouncements {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  announcements: Array<{
    id: string;
    description: string;
    price: number;
  }>;
}

export interface AvailableSellersResponse {
  availableSellers: SellerWithAnnouncements[];
}

export interface BuyerChatsResponse {
  buyerChats: Chat[];
}

export interface SellerChatsResponse {
  sellerChats: Chat[];
}

export interface AnnouncementsResponse {
  announcements: Announcement[];
}

export interface SendMessageResponse {
  sendMessage: Message;
}

export interface SendMessageVariables {
  chat_id: string;
  content: string;
}

export interface MarkMessagesAsReadResponse {
  markMessagesAsRead: {
    success: boolean;
    message?: string;
    count?: number;
    messages?: Message[];
  };
}

export interface MarkMessagesAsReadVariables {
  chat_id: string;
}
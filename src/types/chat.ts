export interface Chat {
  id: string;
  seller: User;
  buyer: User;
  car_card: Announcement;
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
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
  createdAt: string;
  read: boolean;
  sender: User;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
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
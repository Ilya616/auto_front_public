import { gql } from '@apollo/client';
import { SellerChatsResponse, Chat } from '../types/chat';

export const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
      role
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    me{
      id
      role_id
      role{
        id
        role
      }
    }
  }
`;

export const GET_BUYER_CHATS = gql`
  query GetBuyerChats {
    buyerChats {
      id
      seller {
        id
        name
        avatar
      }
      car_card  {
        id
        description
        price
        year
      }
      messages {
        content
        created_at
        sender {
          name
        }
      }
    }
  }
`;

export const GET_SELLER_CHATS = gql`
  query GetSellerChats {
    sellerChats {
      id
      buyer {
        id
        name
        avatar
      }
      car_card  {
        id
        description
        price
        year
      }
      messages {
        content
        created_at
        sender {
          name
        }
      }
    }
  }
`;

export const GET_AVAILABLE_SELLERS = gql`
  query GetAvailableSellers {
    availableSellers {
      id
      name
      email
      avatar
      announcements {
        id
        description
        price
      }
    }
  }
`;

export type GetSellerChatsResponse = {
  chats: Chat[];
};

export const GET_HEALTH = gql`
  query GetHealth {
    health
  }
`;
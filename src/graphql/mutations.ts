import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation SendMessage($chat_id: ID!, $content: String!) {
    sendMessage(chat_id: $chat_id, content: $content) {
      id
      content
      sender {
        id
        name
        avatar
      }
      created_at
      read
    }
  }
`;

export const MARK_MESSAGES_AS_READ = gql`
  mutation MarkMessagesAsRead($chat_id: ID!) {
    markMessagesAsRead(chat_id: $chat_id) {
      success
      message
      count
    }
  }
`;

export const START_CHAT = gql`
  mutation StartChat($announcement_id: ID!) {
    startChat(announcement_id: $announcement_id) {
      id
      buyer {
        id
        name
        avatar
      }
      seller {
        id
        name
        avatar
      }
      car_card {
        id
        description
        price
        year
      }
      messages {
        id
        content
        sender {
          id
          name
          avatar
        }
        created_at
        read
      }
      unreadCount
      created_at
    }
  }
`;
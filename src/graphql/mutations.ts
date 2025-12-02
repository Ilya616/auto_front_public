import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation SendMessage($chat_id: ID!, $content: String!) {
    sendMessage(chat_id: $chat_id, content: $content) {
      id
      content
      sender {
        id
        name
      }
      created_at
    }
  }
`;

export const MARK_MESSAGES_AS_READ = gql`
  mutation MarkMessagesAsRead($chat_id: ID!) {
    markMessagesAsRead(chat_id: $chat_id) {
      success
      message
      count
      messages {
        id
        content
        read
        updated_at
        sender {
          id
          name
        }
      }
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
      }
      seller {
        id
        name
      }
      car_card {
        id
        description
        price
      }
      messages {
        id
        content
        sender {
          id
          name
        }
        created_at
        read
      }
    }
  }
`;
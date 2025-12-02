import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
Pusher.logToConsole = true;

const getAuthToken = (): string => {
  return localStorage.getItem('token') || '';
};

const echo = new Echo({
  broadcaster: 'reverb',
  key: 'local-auto-chat-key',
  wsHost: window.location.hostname,
  wsPort: 8082,
  wssPort: 8082,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
  authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
  auth: {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
  },
});

// Отладка
echo.connector.pusher.connection.bind('connected', () => {
  console.log('✅ WebSocket подключен к Reverb');
});

echo.connector.pusher.connection.bind('error', (error: any) => {
  console.error('❌ WebSocket ошибка:', error);
});

console.log('🔄 Echo инициализирован');

export default echo;
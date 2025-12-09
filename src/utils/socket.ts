import { io } from 'socket.io-client';

// Reverb работает на порту 8082 и использует Socket.io протокол
const SOCKET_URL = 'http://localhost:8082';

console.log('🔄 Инициализация Socket.io подключения к:', SOCKET_URL);

const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// События подключения
socket.on('connect', () => {
  console.log('✅ Socket.io подключен к Reverb серверу', {
    id: socket.id,
    connected: socket.connected
  });
});

socket.on('disconnect', (reason) => {
  console.log('❌ Socket.io отключен от Reverb:', reason);
});

socket.on('connect_error', (error) => {
  console.error('❌ Socket.io ошибка подключения к Reverb:', error);
});

socket.on('reconnect_attempt', (attempt) => {
  console.log('🔄 Попытка переподключения:', attempt);
});

socket.on('reconnect', (attempt) => {
  console.log('✅ Успешно переподключились после', attempt, 'попыток');
});

export default socket;
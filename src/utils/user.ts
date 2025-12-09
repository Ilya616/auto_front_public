let cachedUser: any = null;

export const getCurrentUser = (): any => {
  // Если уже закэширован, возвращаем
  if (cachedUser) {
    return cachedUser;
  }
  
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      cachedUser = user; // Кэшируем
      return user;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Ошибка получения пользователя:', error);
    return null;
  }
};

export const getCurrentUserId = (): string | null => {
  const user = getCurrentUser();
  return user?.id?.toString() || null;
};

export const getCurrentUserName = (): string => {
  const user = getCurrentUser();
  return user?.name || 'Гость';
};

// Функция для обновления кэша
export const updateUserCache = (userData: any) => {
  cachedUser = userData;
  localStorage.setItem('user', JSON.stringify(userData));
};
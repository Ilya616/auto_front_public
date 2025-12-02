# Stage 1: Builder stage (создание фронтенда)
FROM node:24-alpine AS builder

WORKDIR /react-frontend

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости
RUN npm install

# Копируем все файлы проекта в рабочую директорию
COPY . .

# Собираем проект React
# RUN npm run build
RUN npm run build

# Используем Nginx для отдачи статических файлов
FROM nginx:alpine

# Копируем сборку из предыдущего этапа
COPY --from=builder /react-frontend/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Для development
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Или для production:
# RUN npm run build
# CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
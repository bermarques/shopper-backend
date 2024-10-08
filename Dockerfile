FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
EXPOSE $PORT
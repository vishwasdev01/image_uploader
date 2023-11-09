FROM node:18.17.0 AS server

WORKDIR /server

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
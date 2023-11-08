FROM node:18.17.0 AS server

WORKDIR /server

COPY server/package*.json ./

RUN npm install

COPY server/ ./

EXPOSE 8080

CMD ["npm", "start"]

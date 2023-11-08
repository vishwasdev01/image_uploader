FROM node:18.17.0 AS server

WORKDIR /client

COPY client/package*.json ./

RUN npm install

COPY client/ ./

RUN npm run build

FROM nginx

COPY --form=client /client/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

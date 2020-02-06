FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${APP_PORT}

ENTRYPOINT [ "npm", "start" ]

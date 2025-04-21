FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install cors --save

RUN npm install -g nodemon --save-dev

EXPOSE 3000

CMD ["nodemon", "bookshop/app/server.js"]
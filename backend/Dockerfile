FROM node:21.1.0

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY . /usr/src/app/

CMD ["node", "index.js"]
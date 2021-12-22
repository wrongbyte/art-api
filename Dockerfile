FROM node:latest
RUN mkdir art-api
WORKDIR /art-api

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

EXPOSE ${APP_PORT}
CMD ["npm", "start"]
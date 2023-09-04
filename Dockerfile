FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm i
RUN npm i pm2 -g

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
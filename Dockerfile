FROM node:18-alpine as builder
WORKDIR /usr/api
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/api
COPY --from=builder /usr/api/package*.json ./
COPY --from=builder /usr/api/dist ./dist
COPY --from=builder /usr/api/ecosystem.config.json ./
COPY --from=builder /usr/api/.env.production ./
RUN npm install --omit=dev
RUN npm install pm2 -g

EXPOSE 3000

CMD [ "npm", "run", "start" ]
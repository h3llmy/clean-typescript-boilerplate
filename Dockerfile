FROM node:18-alpine as builder
WORKDIR /usr/api
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:18-alpine as obfuscator
WORKDIR /usr/api
COPY package*.json ./
COPY --from=builder /usr/api/dist ./
RUN npm i --save-dev javascript-obfuscator
RUN "javascript-obfuscator -o dist --exclude='node_modules'"

FROM node:18-alpine
WORKDIR /usr/api
COPY --from=builder /usr/api/package*.json ./
COPY --from=obfuscator /usr/api/dist ./dist
COPY --from=builder /usr/api/ecosystem.config.json ./
RUN npm install --omit=dev
RUN npm install pm2 -g

EXPOSE 3000

CMD [ "npm", "run", "start" ]
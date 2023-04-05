FROM node:16.20.0-alpine3.17
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./

RUN npm install
WORKDIR /app
COPY . .
RUN npm run build
USER root
RUN chown -R node:node /app/node_modules/.cache
USER node
EXPOSE 3000

CMD ["npm", "start"]

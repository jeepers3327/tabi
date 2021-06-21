FROM node:16-buster-slim as build-node

WORKDIR /app

COPY package.json yarn.lock ./
COPY vite.config.ts ./
COPY .env.production ./
COPY src ./src/
COPY tsconfig.json ./
COPY index.html ./

RUN yarn install && yarn build


FROM nginx:1.21.0-alpine
EXPOSE 3000

COPY --from=build-node /app/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

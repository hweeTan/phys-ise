# syntax=docker/dockerfile:1

FROM node:20-alpine
WORKDIR /app
COPY . .
RUN yarn
WORKDIR /app/client
RUN yarn
RUN yarn build
WORKDIR /app
CMD ["yarn", "start"]
EXPOSE 8081

FROM node:16-alpine as fe-build

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY ./todo-fe /home/node/app

RUN yarn install

RUN yarn build

FROM node:16-alpine as be-build

WORKDIR /home/node/app

COPY ./todo-be /home/node/app

RUN yarn install

RUN yarn build

FROM node:16-alpine as production

WORKDIR /home/node/app

ARG NODE_ENV=production
ENV NODE_ENV={NODE_ENV}

COPY ./todo-be/package.json ./
COPY ./todo-be/yarn.lock ./
COPY ./todo-be/config config

# Copy build artifact from react app
COPY --from=fe-build /home/node/app/build ./client

RUN yarn install --production --frozen-lockfile

COPY --from=be-build /home/node/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]



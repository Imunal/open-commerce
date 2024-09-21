FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./tsconfig.json
COPY nest-cli.json nest-cli.json
COPY prisma ./prisma

ENV PROTO_PATH='/usr/src/app/protos'
COPY protos $PROTO_PATH

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm prisma generate

COPY apps/api-gateway apps/api-gateway
COPY libs libs

RUN pnpm run build api-gateway

FROM node:alpine as production

WORKDIR /usr/src/app

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

ENV PROTO_PATH='/usr/src/app/protos'

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY prisma ./prisma

RUN npm i -g pnpm
RUN pnpm install --prod

COPY --from=development /usr/src/app/dist/ ./dist

#COPY Protos directory
COPY protos $PROTO_PATH

#Move to build directory and create .env file there
WORKDIR /usr/src/app/dist/apps/api-gateway

RUN echo "NODE_ENV=production" >> ./.env
RUN echo "DATABASE_URL=${DATABASE_URL}" >> ./.env

CMD ["node", "--env-file=.env", "/usr/src/app/dist/apps/api-gateway/main.js"]
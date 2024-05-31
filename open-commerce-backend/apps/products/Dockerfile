FROM node:alpine AS development

ARG NODE_ENV=develop
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/node

#
COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY . .

RUN npm run build

#-----------------------

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /home/node

#
COPY package.json ./
COPY package-lock.json ./

RUN npm i

RUN npm i --production

COPY --from=development /home/node/dist ./dist

COPY proto proto

CMD ["node", "dist/apps/products/main.js"]
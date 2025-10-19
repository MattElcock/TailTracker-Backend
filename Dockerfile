FROM node:22.13.1-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY dist ./dist

CMD ["node", "dist"]


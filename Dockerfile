FROM node:22.13.1-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-scripts --production

COPY dist ./dist

CMD ["node", "dist"]


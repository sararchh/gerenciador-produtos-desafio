FROM node:22-alpine

WORKDIR /app

RUN corepack enable && yarn global add @angular/cli

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 4200

# Comando para rodar a aplicação
CMD ["ng", "serve", "--host", "0.0.0.0"]


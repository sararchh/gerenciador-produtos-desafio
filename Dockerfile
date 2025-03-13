FROM node:22-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Habilita o Corepack para usar Yarn e instala o Angular CLI globalmente
RUN corepack enable && yarn global add @angular/cli

# Copia os arquivos de dependências
COPY package.json yarn.lock ./

# Instala as dependências do projeto
RUN yarn install

# Copia todos os arquivos do projeto
COPY . .

# Expõe a porta padrão do Angular
EXPOSE 4200

# Comando para rodar a aplicação
CMD ["ng", "serve", "--host", "0.0.0.0"]


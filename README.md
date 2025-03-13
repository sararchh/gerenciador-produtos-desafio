# Angular + TypeScript + Vite
### Store Front
Este é um projeto Angular para uma aplicação de vitrine de produtos. A aplicação permite adicionar, editar, deletar e pesquisar produtos. Utiliza várias bibliotecas populares, incluindo Angular Material e ngx-toastr para notificações.

## Como rodar o servidor

Inicie o servidor `JSON.SERVE` com o seguinte comando:
```sh
yarn db:server
```

## Como rodar em desenvolvimento

Inicie a aplicação em modo de desenvolvimento com o seguinte comando:
```sh
yarn start
```

## Como rodar em produção

Para rodar a aplicação em produção, siga os seguintes passos:

1. Faça o build da aplicação:
    ```sh
    yarn build
    ```

2. Inicie a aplicação em modo de preview:
    ```sh
    yarn start
    ```

## Como rodar com Docker

Para rodar a aplicação utilizando Docker, siga os seguintes passos:

1. Construa e inicie os contêineres:
    ```sh
    docker compose up --build
    ```

2. Acesse a aplicação no navegador:
    - Frontend: [http://localhost:4200](http://localhost:4200)
    - JSON Server: [http://localhost:3333](http://localhost:3333)



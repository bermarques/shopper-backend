# Descrição

API de integração com o LLM **Gemini** para leitura de medidores de água e gás. Esta API foi desenvolvida utilizando **Node.js**, **Express**, **Prisma**, **MySQL** e **TypeScript**.

### Funcionalidades

- Integração com o sistema **Gemini** para leitura de dados de medidores de água e gás.
- Conexão com banco de dados MySQL utilizando o ORM **Prisma**.
- Desenvolvimento em **TypeScript**

### Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework para criação de APIs web.
- **Prisma**: ORM (Object-Relational Mapping) moderno para TypeScript e Node.js.
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações em containers.

## Requisitos

- [Docker](https://www.docker.com/get-started)

## Instalação

Siga os passos abaixo para configurar e rodar o projeto em sua máquina local.

1. Clone este repositório:

   ```bash
   git clone git@github.com:bermarques/shopper-backend.git
   cd shopper-backend
   ```

2. Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente necessárias. Há um arquivo `.env.example` para ser seguido no projeto.

3. Execute o comando para iniciar o container Docker:
   ```bash
   docker-compose up
   ```

## Uso

Com o Docker rodando, a API estará disponível em `http://localhost:3000` (ou na porta definida no `.env`). Utilize um cliente HTTP como **Postman** ou **Insomnia** para interagir com a API.

### Exemplos de Endpoints

- `POST /upload`: Consulta o Gemini para a leitura de um medidor, e persiste os dados no banco.
- `PATCH /confirm`: Confirma ou altera valor do medidor retornado pelo `/upload`.
- `GET /:customer_code/list`: Retorna todas as medições de um usuário

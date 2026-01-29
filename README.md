# Mind Blog – Backend

API REST do projeto **Mind Blog**.

## 🛠️ Tecnologias
- Node.js
- Express
- TypeScript
- MySQL
- bcrypt
- Multer
- JWT

## 🚀 Funcionalidades
- Autenticação com JWT
- CRUD de usuários
- CRUD de artigos
- Upload de imagens
- Comentários em artigos

## ⚙️ Variáveis de ambiente

Crie um arquivo `.env`:

PORT=3333
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mind_blog
JWT_SECRET=sua_chave_secreta

## ▶️ Como rodar
npm install
npm run dev


Servidor rodando em:

http://localhost:3333

## 📌 Rotas principais

POST /auth/login

POST /auth/register

GET /posts

POST /posts

##🗄 Banco de dados

O dump do banco está disponível em:
/database/schema.sql

## 🔐 Autenticação

Login gera token JWT

Rotas protegidas exigem Bearer Token

POST /posts/:id/comments

POST /posts/:id/edit

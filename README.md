# API REST — Autenticação e Autorização com JWT

API REST desenvolvida com Node.js, Express, Prisma e PostgreSQL, com autenticação baseada em JWT.

---

## Tecnologias

- Node.js
- Express
- Prisma ORM (v5)
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [PostgreSQL](https://www.postgresql.org/) instalado e a correr
- npm

---

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/teu-utilizador/nome-do-repo.git
cd nome-do-repo
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Cria um ficheiro `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://utilizador:password@localhost:5432/nome_db"
JWT_SECRET="uma_chave_secreta_muito_segura"
PORT=3000
```

> Substitui `utilizador`, `password` e `nome_db` pelos dados da tua base de dados PostgreSQL.

### 4. Criar a base de dados e aplicar migrações

```bash
npx prisma migrate dev --name init
```

### 5. Arrancar o servidor

```bash
node server.js
```

O servidor fica disponível em `http://localhost:3000`.

---

## Endpoints

### Autenticação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/auth/signup` | Registar utilizador | Não |
| POST | `/auth/signin` | Autenticar utilizador | Não |
| GET | `/auth/profile` | Ver perfil do utilizador | Sim |

### Tarefas

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/tasks` | Listar todas as tarefas | Sim |
| GET | `/tasks/:id` | Ver tarefa por ID | Sim |
| POST | `/tasks` | Criar tarefa | Sim |
| PUT | `/tasks/:id` | Atualizar tarefa | Sim |
| DELETE | `/tasks/:id` | Eliminar tarefa | Sim |

---

## Exemplos de utilização

### Registar utilizador

```http
POST /auth/signup
Content-Type: application/json

{
  "name": "Ana Silva",
  "email": "ana@email.com",
  "password": "123456"
}
```

### Autenticar utilizador

```http
POST /auth/signin
Content-Type: application/json

{
  "email": "ana@email.com",
  "password": "123456"
}
```

Resposta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Criar tarefa (com token)

```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Estudar JWT",
  "description": "Rever a ficha de autenticação"
}
```

---

## Autenticação nas rotas protegidas

Todas as rotas de `/tasks` e `/auth/profile` requerem o token JWT no header:

```
Authorization: Bearer <token>
```

---

## Estrutura do projeto

```
projeto/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── tasks.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── tasks.routes.js
│   ├── app.js
│   └── prisma.js
├── .env
├── package.json
└── server.js
```

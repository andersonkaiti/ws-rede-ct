# 🔧 API da RedeCT

<div align="center">

**API REST da RedeCT** construída com Node.js, Express 5, TypeScript e Prisma (PostgreSQL)

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.2.1-000000?style=flat&logo=express)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.1-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat&logo=jsonwebtokens)](https://jwt.io/)
[![Firebase](https://img.shields.io/badge/Firebase-Storage-FFCA28?style=flat&logo=firebase)](https://firebase.google.com/)
[![Sharp](https://img.shields.io/badge/Sharp-Image_Processing-99CC00?style=flat)](https://sharp.pixelplumbing.com/)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-Docs-6BA539?style=flat&logo=swagger)](https://swagger.io/specification/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat&logo=docker)](https://www.docker.com/)

</div>

## 📋 Índice

- [🎯 Sobre](#-sobre)
- [🛠 Tecnologias](#-tecnologias)
- [🏗 Arquitetura](#-arquitetura)
- [⚙️ Configuração](#️-configuração)
  - [🔐 Variáveis de Ambiente](#-variáveis-de-ambiente)
  - [🗄 Banco de Dados](#-banco-de-dados)
- [🚀 Execução](#-execução)
- [📘 Documentação da API](#-documentação-da-api)
- [🔒 Autenticação](#-autenticação)
- [🖼 Uploads](#-uploads)
- [🧭 Rotas Principais](#-rotas-principais)
- [🗺 Modelos (Prisma)](#-modelos-prisma)
- [🧰 Scripts Úteis](#-scripts-úteis)
- [🙌 Contribuições](#-contribuições)
- [📄 Licença](#-licença)

## 🎯 Sobre

API responsável por autenticação, gestão de usuários, notícias, equipes, certificações e pendências da RedeCT. Inclui proteção por JWT, upload de arquivos para o Firebase Storage com processamento automático de imagens (conversão para WebP via Sharp), e documentação interativa completa em `/docs` (Scalar/OpenAPI).

## 🛠 Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| Node.js | 18+ | Runtime JavaScript (ESM) |
| Express | 5.2.1 | Framework web |
| TypeScript | 5.9.3 | Tipagem estática |
| Prisma | 7.1.0 | ORM para PostgreSQL |
| PostgreSQL | 17 | Banco de dados relacional |
| JSON Web Token | 9.0.3 | Autenticação por token |
| Bcrypt | 3.0.3 | Hash de senhas |
| Multer | 2.0.2 | Upload de arquivos |
| Firebase Admin | 13.6.0 | Storage de arquivos |
| Sharp | 0.34.5 | Processamento de imagens (WebP) |
| Google Cloud Storage | 7.18.0 | Cliente para Firebase Storage |
| CORS | 2.8.5 | Cross-Origin Resource Sharing |
| Scalar/OpenAPI | - | Documentação interativa em `/docs` |
| Zod | 4.1.13 | Validação de schemas e OpenAPI |
| tsup | 8.5.1 | Bundler/Build TS |

## 🏗 Arquitetura

```
bin/server.ts          # bootstrap do HTTP server (porta 4000)
src/app.ts             # app Express, middlewares e rotas
src/routes/*.ts        # módulos de rotas
src/controllers/**     # controllers por recurso
src/services/**        # serviços (JWT, Firebase Storage)
src/middlewares/**     # auth, multer
src/openapi/**         # documentação OpenAPI
prisma/schema.prisma   # schema do banco
```

## ⚙️ Configuração

> Baseie sua configuração no arquivo `.env.example`: copie para `.env` e ajuste os valores conforme seu ambiente.

### 🔐 Variáveis de Ambiente

Declare (ex.: `.env`). Todas são exigidas por `src/config/env.ts` e pelo Prisma:

- `JWT_SECRET`
- `FIREBASE_BUCKET`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (atenção a quebras de linha/escapes)
- `FIREBASE_PROJECT_ID`
- `FIREBASE_TYPE`
- `FIREBASE_PRIVATE_KEY_ID`
- `FIREBASE_CLIENT_ID`
- `FIREBASE_AUTH_URI`
- `FIREBASE_TOKEN_URI`
- `FIREBASE_AUTH_PROVIDER_X509_CERT_URL`
- `FIREBASE_CLIENT_X509_CERT_URL`
- `DATABASE_URL` (lida em `prisma/schema.prisma`)

Exemplo para o compose abaixo:

```
DATABASE_URL="postgresql://root@localhost:5432/rede_ct?schema=public"
```

### 🗄 Banco de Dados

Suba um PostgreSQL com Docker:

```bash
docker compose up -d postgres
```

Credenciais (`docker-compose.yml`):
- usuário: `root`
- senha: (vazia – `ALLOW_EMPTY_PASSWORD=yes`)
- database: `rede_ct`
- porta: `5432`

Aplique Prisma e migrações:

```bash
pnpm install
npx prisma generate
npx prisma migrate deploy
```

Opcional:

```bash
pnpm run db:studio  # Prisma Studio
pnpm run db:seed    # Seed, se aplicável
```

## 🚀 Execução

Dev (watch):

```bash
pnpm run dev
```

Produção:

```bash
pnpm run build
pnpm start
```

A API inicia na porta `4000` (ver `bin/server.ts`).

## 📘 Documentação da API

A documentação interativa completa está disponível em: https://ws-rede-ct.vercel.app/docs

Esta documentação inclui:
- **32 módulos de rotas** com todos os endpoints
- **Schemas de requisição e resposta** para cada endpoint
- **Autenticação e autorização** necessárias
- **Exemplos de uso** para facilitar a integração
- **Interface interativa** para testar os endpoints diretamente

## 🔒 Autenticação

- Header: `Authorization: Bearer <token>`
- Middlewares:
  - `authenticated` — exige usuário autenticado
  - `isAdmin` — exige `role=ADMIN`

## 🖼 Uploads

A API utiliza `multer` para gerenciar uploads de arquivos em diversos endpoints. Os arquivos são organizados por tipo de campo:

### 📷 Campo `image` (imagens)
- Notícias (`/news`)
- Eventos (`/events`)
- Cursos (`/courses`)
- Programas de Pós-Graduação (`/post-graduate-programs`)
- Galerias de Congressos Internacionais (`/international-scientific-congresses/:id/gallery`)
- Galerias de Congressos Regionais (`/regional-congresses/:id/gallery`)
- Destaques RedeCT (`/redect-highlights`)

### 🖼️ Campo `logo` (logotipos)
- Revistas Científicas (`/scientific-journals`)
- Grupos de Pesquisa (`/research-groups`)
- Parceiros de Congressos Internacionais (`/international-scientific-congresses/:id/partners`)
- Parceiros de Congressos Regionais (`/regional-congresses/:id/partners`)
- Parceiros (`/partners`)
- Museus (`/museums`)

### 📄 Campo `document` (documentos)
- Regimentos (`/regiments`)
- Pendências (`/pendencies`)
- Atas de Reunião (`/meetings/:id/minutes`)
- Extratos Financeiros (`/financial-transaction-statements`)

### 👤 Campo `avatarImage` (avatar do usuário)
- Usuários (`/users`)

### 🎓 Campo `certification` (certificados)
- Certificações (`/certifications`)

### 📸 Campo `photo` (fotos)
- In Memoriam (`/in-memoriam`)

### 🎬 Campo `thumbnail` (miniaturas)
- Webinários (`/webinars`)

### ⚡ Processamento Automático de Imagens

As imagens são automaticamente processadas com **Sharp** para:
- Conversão para formato **WebP** (otimização de tamanho)
- Qualidade de 80% para melhor performance

Armazenamento no **Firebase Storage** (`src/services/firebase-storage`).

<div align="center">

Construído com ❤️ para a Rede de Ciência e Tecnologia

</div>
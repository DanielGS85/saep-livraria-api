# API Livraria — base de testes e deploy (SAEP)

API REST de uma livraria (autores, editoras, livros) em **Next.js (App Router) + PostgreSQL (SQL cru,
lib `postgres`)**, para praticar **testes que rodam contra o banco** e **implantação na nuvem**. Base
das UCs Teste de Sistemas e Implantação, e ensaio da prova prática do SAEP (banco ↔ back ↔ front).

> O back é feito de **Route Handlers** (`app/api/**/route.ts`) — cada endpoint é uma função
> `Request → Response`. Não há Express nem ORM: o SQL é escrito na mão.

## Pré-requisitos
- **Node.js** 24+
- Conta no **[Supabase](https://supabase.com)** (grátis) — o banco fica na nuvem
- **DBeaver** (opcional, pra inspecionar o banco)

## Etapa 1 — preparar o ambiente

### 1. Fork + clonar + instalar
Faça **fork** (botão **Fork**, canto superior direito) pra ter uma cópia **sua**, e clone o **SEU** fork:
```bash
git clone https://github.com/SEU-USUARIO/saep-livraria-api.git
cd saep-livraria-api
cp .env.example .env
npm install
```

### 2. Criar o banco no Supabase
1. **supabase.com → New project**. Dê um nome e **guarde a senha do banco**.
2. Botão **Connect** (topo) → **Connection string** → **Session pooler**
   *(o Session pooler é IPv4 — o caso do laboratório; o "Direct" é só IPv6.)*
3. Cole a URI no `.env` em **`DATABASE_URL=`**, trocando `[YOUR-PASSWORD]` pela senha do projeto.

> 👥 Cada aluno cria o **seu próprio** projeto Supabase. O `db:reset` **limpa e re-semeia** — num
> banco compartilhado, um aluno apagaria os dados do outro.

### 3. Criar o schema + semear
```bash
npm run db:reset     # cria as tabelas + a semente (3 autores, 4 editoras, 5 livros)
```
Confira no Supabase (**Table Editor**) que as tabelas apareceram populadas.

### 4. Rodar
```bash
npm run dev          # http://localhost:3000  (front simples + a API em /api/...)
```

## Scripts

| Comando | O quê |
|---|---|
| `npm run dev` | sobe o Next em modo dev |
| `npm run build` | build de produção (o que o deploy roda) |
| `npm start` | serve o build |
| `npm test` | roda os testes (Jest) |
| `npm run test:cov` | cobertura |
| `npm run lint` | ESLint |
| `npm run db:reset` | cria o schema + semeia o banco |

## Estrutura

```
saep-livraria-api/
├─ app/
│  ├─ page.tsx                       ← front simples (lista o catálogo)
│  └─ api/
│     ├─ autores/route.ts            ← GET (listar) · POST (criar)
│     ├─ autores/[id]/route.ts       ← GET · PUT · DELETE
│     ├─ autores/[id]/livros/route.ts
│     ├─ editoras/… (idem)
│     └─ livros/… (GET/POST, [id] GET/PUT/DELETE)
├─ lib/db.ts                         ← conexão Postgres (SQL cru, singleton)
├─ db/seed.ts                        ← schema + limpa + semeia (SQL)
├─ scripts/reset-db.ts               ← o seeder (npm run db:reset)
└─ tests/
   ├─ helpers/db.ts                  ← reseta o banco entre os testes
   └─ routes/editoras.test.ts        ← exemplo (chama o handler direto)
```

## Endpoints (prefixo `/api`)

`/api/autores` · `GET` · `GET /:id` · `GET /:id/livros` · `POST` · `PUT /:id` · `DELETE /:id`
`/api/editoras` · `GET` · `GET /:id` · `GET /:id/livros` · `POST` · `PUT /:id` · `DELETE /:id`
`/api/livros` · `GET` · `GET /:id` · `POST` · `PUT /:id` · `DELETE /:id`

## O exercício (testes)
Os testes rodam **contra o banco** (com seed) e chamam o **route handler direto** — sem servidor, sem
supertest. O padrão está no `tests/routes/editoras.test.ts` e no `DESAFIO-TESTES.md`. Monte o **plano**
(`describe` + `it.todo`), **commite**, e implemente **caso a caso** — commits semânticos (Husky) e ESLint limpo.

## Deploy (Vercel + Supabase)
1. **vercel.com → Add New → Project → Import** o seu fork.
2. Em **Environment Variables**, cadastre a **`DATABASE_URL`** (a mesma do Supabase).
3. Deploy. Todo push na `main` publica sozinho (CD).
4. Semeie o banco de produção uma vez: `DATABASE_URL="<a do Supabase>" npm run db:reset`.

## Já vem configurado (a "casa arrumada")
- **TypeScript** estrito + **Next build** com type-check.
- **CI (GitHub Actions)** → sobe um Postgres de serviço, roda `npm run build` + `npm test` a cada push/PR.
- **Husky + commitlint** → Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`…).
- **Postgres (SQL cru)** → sem ORM; o schema é criado pelo `db:reset`.

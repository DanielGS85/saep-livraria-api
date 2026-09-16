# Desafio — testes de rota (**Autor** e **Livro**)

Escreva os testes de rota cobrindo **todos os casos** abaixo, para os recursos **Autor** e **Livro**.
Livro é a entidade **relacional**: cada livro aponta para um **autor** e uma **editora**.

## Setup

Banco + seed como no [`README.md`](README.md) (`npm run db:reset`). Semente:
**3 autores** (autor 1 = Tolkien, com 2 livros · autor 3 = Machado, com 1) ·
**4 editoras** (editora 1 = Europa-América) · **5 livros** (livro 1 = "O Hobbit").

## Onde e como

Arquivos: **`tests/routes/autores.test.ts`** e **`tests/routes/livros.test.ts`**.
Mesmo padrão dos testes de editora:

```ts
import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';

beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de autor', () => {
  it.todo('...');
});
```

## Requisito de cobertura

Ao final, rode **`npm run test:cov`**. As controllers testadas precisam atingir:

- **`src/controllers/autoresController.ts` → ≥ 90%** em Stmts, Branch, Funcs e Lines
- **`src/controllers/livrosController.ts` → ≥ 90%** em Stmts, Branch, Funcs e Lines

> Cobrir a lista abaixo **inteira** — incluindo os casos de **404** e de **400** — é o que leva a
> cobertura até lá: cada `if` da controller precisa de um caso que **entra** nele e um que **não entra**.

---

## Casos — Autor (`tests/routes/autores.test.ts`)

### Listagem e busca
- [ ] `GET /autores` → **200** e **3** autores
- [ ] `GET /autores/1` → **200**, `nome` = "JRR Tolkien"
- [ ] `GET /autores/999` → **404**

### Criação
- [ ] `POST /autores` válido (`{ nome, nacionalidade }`) → **201** com `id` no corpo
- [ ] `POST /autores` com body vazio → **400**

### Atualização e exclusão
- [ ] `PUT /autores/1` (`{ nacionalidade }`) → **200** com a nacionalidade nova
- [ ] `PUT /autores/999` → **404**
- [ ] `DELETE /autores/3` → **204**
- [ ] `DELETE /autores/999` → **404**

### Relacional
- [ ] `GET /autores/1/livros` → **2** livros
- [ ] `GET /autores/3/livros` → **1** livro

---

## Casos — Livro (`tests/routes/livros.test.ts`)

### Listagem e busca
- [ ] `GET /livros` → **200** e **5** livros
- [ ] `GET /livros/1` → **200**, `titulo` = "O Hobbit"
- [ ] `GET /livros/999` → **404**

### Criação
- [ ] `POST /livros` válido (`titulo`, `paginas` ≥ 1, `autor_id` e `editora_id` existentes) → **201** com `id` no corpo
- [ ] `POST /livros` com body vazio → **400**
- [ ] `POST /livros` com `autor_id` inexistente (`999`) → **400**
- [ ] `POST /livros` com `editora_id` inexistente (`999`) → **400**
- [ ] `POST /livros` com `paginas` = `0` → **400**
- [ ] `POST /livros` com `paginas` negativas → **400**

### Atualização e exclusão
- [ ] `PUT /livros/1` (`{ paginas }`) → **200**
- [ ] `PUT /livros/999` → **404**
- [ ] `DELETE /livros/5` → **204**
- [ ] `DELETE /livros/999` → **404**

### Relacional
- [ ] `GET /editoras/2/livros` → os livros da editora 2
- [ ] `POST /livros` para a editora 2 e, em seguida, `GET /editoras/2/livros` → a lista **cresce em 1** e inclui o novo livro

---

## Fluxo de entrega

1. **Plano primeiro**: cada arquivo só com `describe` + `it.todo` (um por caso). Commit: `test: plano de testes de autor e livro`.
2. **Resolva um por vez**: implemente o teste, rode, commit. Um commit por caso (ou por arquivo).
3. **Commits semânticos** (`test:` `feat:` `fix:` `docs:`) — o Husky recusa fora do padrão.
4. **ESLint limpo** (`npm run lint`).
5. **Cobertura** batendo o requisito acima (`npm run test:cov`).

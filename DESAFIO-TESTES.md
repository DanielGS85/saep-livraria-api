# Desafio — testes de rota do recurso **Livro**

Escreva os testes de rota do recurso **Livro** cobrindo **todos os casos** da lista abaixo.
Livro é a entidade **relacional**: cada livro aponta para um **autor** e uma **editora**.

## Setup

Banco + seed como no [`README.md`](README.md) (`npm run db:reset`). Semente:
**3 autores** (autor 1 = Tolkien, com 2 livros) · **4 editoras** (editora 1 = Europa-América) ·
**5 livros** (livro 1 = "O Hobbit").

## Onde e como

Arquivo: **`tests/routes/livros.test.ts`**. Mesmo padrão dos testes de editora:

```ts
import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';

beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de livro', () => {
  it.todo('...');
});
```

## Os casos a cobrir (um `it` por item)

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
- [ ] `PUT /livros/1` (`{ paginas }`) → **204**
- [ ] `DELETE /livros/5` → **204**
- [ ] `DELETE /livros/999` → **404**

### Relacional
- [ ] `GET /autores/1/livros` → **2** livros
- [ ] `GET /editoras/2/livros` → os livros da editora 2
- [ ] `POST /livros` para a editora 2 e, em seguida, `GET /editoras/2/livros` → a lista **cresce em 1** e inclui o novo livro

## Fluxo de entrega

1. **Plano primeiro**: arquivo só com `describe` + `it.todo` (um por caso acima). Commit: `test: plano de testes de livros`.
2. **Resolva um por vez**: implemente o teste, rode, commit. Um commit por caso (ou por arquivo).
3. **Commits semânticos** (`test:` `feat:` `fix:` `docs:`) — o Husky recusa fora do padrão.
4. **ESLint limpo** (`npm run lint`).

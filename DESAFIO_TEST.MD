Claro. Aqui está **todo o conteúdo em um único bloco `bash`**, para você copiar de uma vez:

```bash
# ============================================================
# DESAFIO — TESTES DE ROTAS: AUTOR E LIVRO
# ============================================================

# ------------------------------------------------------------
# 1. SETUP — RESETAR O BANCO
# ------------------------------------------------------------

npm run db:reset


# ------------------------------------------------------------
# 2. ARQUIVOS DOS TESTES
# ------------------------------------------------------------

# Criar os arquivos:
#
# tests/routes/autores.test.ts
# tests/routes/livros.test.ts


# -----------------------------------------------------------------------
# 3. PADRÃO INICIAL DOS TESTES
#
# requisito do test                  ###  interpretacao do requisito
# -----------------------------------------------------------------------
  


# autores.test.ts                              

import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';

beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de autor', () => {

  test('GET /autores → 200 e 3 autores'); #'GET /autor retorna sattus 200

  it.todo('GET /autores/1 → 200 e nome JRR Tolkien'); # 'GET /autor retorna 1 devolve status 200 e nome correto

  it.todo('GET /autores/999 → 404'); # GET /autores/999 retorna estatus 404

  it.todo('POST /autores válido → 201 com id'); #POST /autores válido retorna 201 com id

  it.todo('POST /autores com body vazio → 400');

  it.todo('PUT /autores/1 → 200 com nova nacionalidade');

  it.todo('PUT /autores/999 → 404');

  it.todo('DELETE /autores/3 → 204');

  it.todo('DELETE /autores/999 → 404');

  it.todo('GET /autores/1/livros → 2 livros');

  it.todo('GET /autores/3/livros → 1 livro');

});


# ------------------------------------------------------------
# 4. LIVROS — PLANO DOS TESTES
# ------------------------------------------------------------

# livros.test.ts

import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';

beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de livro', () => {

  it.todo('GET /livros → 200 e 5 livros');

  it.todo('GET /livros/1 → 200 e título O Hobbit');

  it.todo('GET /livros/999 → 404');

  it.todo('POST /livros válido → 201 com id');

  it.todo('POST /livros com body vazio → 400');

  it.todo('POST /livros com autor_id inexistente → 400');

  it.todo('POST /livros com editora_id inexistente → 400');

  it.todo('POST /livros com paginas = 0 → 400');

  it.todo('POST /livros com paginas negativas → 400');

  it.todo('PUT /livros/1 → 200');

  it.todo('PUT /livros/999 → 404');

  it.todo('DELETE /livros/5 → 204');

  it.todo('DELETE /livros/999 → 404');

  it.todo('GET /editoras/2/livros');

  it.todo('POST /livros para editora 2 e GET /editoras/2/livros → lista cresce em 1');

});


# ------------------------------------------------------------
# 5. DADOS DO BANCO / SEED
# ------------------------------------------------------------

# Autores:
#
# Autor 1 → JRR Tolkien → 2 livros
# Autor 3 → Machado → 1 livro
# Total → 3 autores
#
# Editoras:
#
# Total → 4 editoras
# Editora 1 → Europa-América
#
# Livros:
#
# Total → 5 livros
# Livro 1 → O Hobbit


# ------------------------------------------------------------
# 6. CASOS — AUTOR
# ------------------------------------------------------------

# GET /autores
# Esperado:
#   status 200
#   quantidade = 3


# GET /autores/1
# Esperado:
#   status 200
#   response.body.nome = "JRR Tolkien"


# GET /autores/999
# Esperado:
#   status 404


# POST /autores
# Body:
#
# {
#   "nome": "Novo Autor",
#   "nacionalidade": "Brasileiro"
# }
#
# Esperado:
#   status 201
#   response.body.id existe


# POST /autores
# Body:
#
# {}
#
# Esperado:
#   status 400


# PUT /autores/1
# Body:
#
# {
#   "nacionalidade": "Nova Nacionalidade"
# }
#
# Esperado:
#   status 200
#   nova nacionalidade na resposta


# PUT /autores/999
# Esperado:
#   status 404


# DELETE /autores/3
# Esperado:
#   status 204


# DELETE /autores/999
# Esperado:
#   status 404


# GET /autores/1/livros
# Esperado:
#   status 200
#   quantidade = 2


# GET /autores/3/livros
# Esperado:
#   status 200
#   quantidade = 1


# ------------------------------------------------------------
# 7. CASOS — LIVRO
# ------------------------------------------------------------

# GET /livros
# Esperado:
#   status 200
#   quantidade = 5


# GET /livros/1
# Esperado:
#   status 200
#   response.body.titulo = "O Hobbit"


# GET /livros/999
# Esperado:
#   status 404


# POST /livros — VÁLIDO
#
# Body:
#
# {
#   "titulo": "Novo Livro",
#   "paginas": 200,
#   "autor_id": 1,
#   "editora_id": 1
# }
#
# Esperado:
#   status 201
#   response.body.id existe


# POST /livros — BODY VAZIO
#
# {}
#
# Esperado:
#   status 400


# POST /livros — AUTOR INEXISTENTE
#
# {
#   "titulo": "Novo Livro",
#   "paginas": 200,
#   "autor_id": 999,
#   "editora_id": 1
# }
#
# Esperado:
#   status 400


# POST /livros — EDITORA INEXISTENTE
#
# {
#   "titulo": "Novo Livro",
#   "paginas": 200,
#   "autor_id": 1,
#   "editora_id": 999
# }
#
# Esperado:
#   status 400


# POST /livros — PAGINAS = 0
#
# {
#   "titulo": "Novo Livro",
#   "paginas": 0,
#   "autor_id": 1,
#   "editora_id": 1
# }
#
# Esperado:
#   status 400


# POST /livros — PAGINAS NEGATIVAS
#
# {
#   "titulo": "Novo Livro",
#   "paginas": -10,
#   "autor_id": 1,
#   "editora_id": 1
# }
#
# Esperado:
#   status 400


# PUT /livros/1
#
# Body:
#
# {
#   "paginas": 300
# }
#
# Esperado:
#   status 200


# PUT /livros/999
# Esperado:
#   status 404


# DELETE /livros/5
# Esperado:
#   status 204


# DELETE /livros/999
# Esperado:
#   status 404


# GET /editoras/2/livros
# Esperado:
#   status 200
#   retornar livros da editora 2


# ------------------------------------------------------------
# 8. TESTE RELACIONAL — EDITORA 2
# ------------------------------------------------------------

# 1º — Fazer GET /editoras/2/livros
#
# Guardar a quantidade inicial.


# 2º — Fazer POST /livros
#
# Exemplo:
#
# {
#   "titulo": "Livro Editora 2",
#   "paginas": 150,
#   "autor_id": 1,
#   "editora_id": 2
# }


# 3º — Fazer novamente:
#
# GET /editoras/2/livros


# 4º — Verificar:
#
# quantidade depois = quantidade antes + 1
#
# E verificar que o novo livro está na lista.


# ------------------------------------------------------------
# 9. ORDEM RECOMENDADA PARA IMPLEMENTAR
# ------------------------------------------------------------

# Primeiro:
#
# GET /autores
# GET /autores/1
# GET /autores/999
# POST /autores válido
# POST /autores vazio
# PUT /autores/1
# PUT /autores/999
# DELETE /autores/3
# DELETE /autores/999
# GET /autores/1/livros
# GET /autores/3/livros


# Depois:
#
# GET /livros
# GET /livros/1
# GET /livros/999
# POST /livros válido
# POST /livros vazio
# POST /livros autor inexistente
# POST /livros editora inexistente
# POST /livros paginas = 0
# POST /livros paginas negativas
# PUT /livros/1
# PUT /livros/999
# DELETE /livros/5
# DELETE /livros/999
# GET /editoras/2/livros
# POST + GET relacionamento editora 2


# ------------------------------------------------------------
# 10. COMMIT DO PLANO
# ------------------------------------------------------------

git add tests/routes/autores.test.ts tests/routes/livros.test.ts

git commit -m "test: plano de testes de autor e livro"


# ------------------------------------------------------------
# 11. TESTAR DURANTE O DESENVOLVIMENTO
# ------------------------------------------------------------

npm test


# ------------------------------------------------------------
# 12. VERIFICAR ESLINT
# ------------------------------------------------------------

npm run lint


# ------------------------------------------------------------
# 13. VERIFICAR COBERTURA
# ------------------------------------------------------------

npm run test:cov


# ------------------------------------------------------------
# 14. COBERTURA MÍNIMA EXIGIDA
# ------------------------------------------------------------

# src/controllers/autoresController.ts
#
# Stmts  → >= 90%
# Branch → >= 90%
# Funcs  → >= 90%
# Lines  → >= 90%
#
#
# src/controllers/livrosController.ts
#
# Stmts  → >= 90%
# Branch → >= 90%
# Funcs  → >= 90%
# Lines  → >= 90%


# ------------------------------------------------------------
# 15. SIGNIFICADO DOS STATUS
# ------------------------------------------------------------

# 200 → operação realizada com sucesso
# 201 → recurso criado
# 204 → recurso excluído sem conteúdo na resposta
# 400 → dados enviados inválidos
# 404 → recurso não encontrado


# ------------------------------------------------------------
# 16. CHECKLIST FINAL
# ------------------------------------------------------------

# [ ] Banco resetado
# [ ] Plano de testes criado
# [ ] Testes de Autor implementados
# [ ] Testes de Livro implementados
# [ ] Casos 400 cobertos
# [ ] Casos 404 cobertos
# [ ] Relacionamentos testados
# [ ] npm test passando
# [ ] npm run lint sem erros
# [ ] npm run test:cov >= 90%
# [ ] Commits semânticos usando test:, feat:, fix: ou docs:
```

**Atenção:** esse bloco é o **roteiro/plano completo**. Os trechos `import`, `describe` e `it.todo` são para os arquivos `.test.ts`; os comandos `npm`, `git` etc. são para o terminal.



#### ##### ######


Desafio — testes de rota (Autor e Livro)
Escreva os testes de rota cobrindo todos os casos abaixo, para os recursos Autor e Livro. Livro é a entidade relacional: cada livro aponta para um autor e uma editora.

Setup
Banco + seed como no README.md (npm run db:reset). Semente: 3 autores (autor 1 = Tolkien, com 2 livros · autor 3 = Machado, com 1) · 4 editoras (editora 1 = Europa-América) · 5 livros (livro 1 = "O Hobbit").

Onde e como
Arquivos: tests/routes/autores.test.ts e tests/routes/livros.test.ts. Mesmo padrão dos testes de editora:

import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';

beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de autor', () => {
  it.todo('...');
});
Requisito de cobertura
Ao final, rode npm run test:cov. As controllers testadas precisam atingir:

src/controllers/autoresController.ts → ≥ 90% em Stmts, Branch, Funcs e Lines
src/controllers/livrosController.ts → ≥ 90% em Stmts, Branch, Funcs e Lines
Cobrir a lista abaixo inteira — incluindo os casos de 404 e de 400 — é o que leva a cobertura até lá: cada if da controller precisa de um caso que entra nele e um que não entra.

Casos — Autor (tests/routes/autores.test.ts)
Listagem e busca
 GET /autores → 200 e 3 autores
 GET /autores/1 → 200, nome = "JRR Tolkien"
 GET /autores/999 → 404
Criação
 POST /autores válido ({ nome, nacionalidade }) → 201 com id no corpo
 POST /autores com body vazio → 400
Atualização e exclusão
 PUT /autores/1 ({ nacionalidade }) → 200 com a nacionalidade nova
 PUT /autores/999 → 404
 DELETE /autores/3 → 204
 DELETE /autores/999 → 404
Relacional
 GET /autores/1/livros → 2 livros
 GET /autores/3/livros → 1 livro
Casos — Livro (tests/routes/livros.test.ts)
Listagem e busca
 GET /livros → 200 e 5 livros
 GET /livros/1 → 200, titulo = "O Hobbit"
 GET /livros/999 → 404
Criação
 POST /livros válido (titulo, paginas ≥ 1, autor_id e editora_id existentes) → 201 com id no corpo
 POST /livros com body vazio → 400
 POST /livros com autor_id inexistente (999) → 400
 POST /livros com editora_id inexistente (999) → 400
 POST /livros com paginas = 0 → 400
 POST /livros com paginas negativas → 400
Atualização e exclusão
 PUT /livros/1 ({ paginas }) → 200
 PUT /livros/999 → 404
 DELETE /livros/5 → 204
 DELETE /livros/999 → 404
Relacional
 GET /editoras/2/livros → os livros da editora 2
 POST /livros para a editora 2 e, em seguida, GET /editoras/2/livros → a lista cresce em 1 e inclui o novo livro
Fluxo de entrega
Plano primeiro: cada arquivo só com describe + it.todo (um por caso). Commit: test: plano de testes de autor e livro.
Resolva um por vez: implemente o teste, rode, commit. Um commit por caso (ou por arquivo).
Commits semânticos (test: feat: fix: docs:) — o Husky recusa fora do padrão.
ESLint limpo (npm run lint).
Cobertura batendo o requisito acima (npm run test:cov).
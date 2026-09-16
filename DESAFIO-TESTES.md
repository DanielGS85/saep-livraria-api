# Desafio — você projeta os testes (recurso **Livro**)

> 🎯 **Este é diferente do `TESTES.md`.** Lá a lista de casos vinha pronta e você só preenchia.
> **Aqui você PROJETA os casos** — usando as técnicas de **caixa preta** (Aula 05) e montando o
> **plano + matriz de rastreabilidade** (Aula 06). O alvo é o **Livro**, a entidade **relacional**:
> ela aponta para um **autor** e uma **editora**. Testar relação é diferente de testar entidade solta.

Pré-requisitos: mesmo setup do [`README.md`](README.md) (banco `livraria` + `npm run db:reset`).
Semente relevante: **3 autores**, **4 editoras**, **5 livros** — o **autor 1 (Tolkien) tem 2 livros**,
e o **livro 1** é "O Hobbit".

---

## 0. Os requisitos do recurso Livro (leia — é daqui que os casos saem)

Um **livro** tem `titulo` (texto), `paginas` (inteiro **positivo** — todo livro tem ≥ 1 página),
`autor_id` e `editora_id` (referências a um autor e a uma editora **que existem**).

| # | Requisito |
|---|---|
| R1 | Listar livros → devolve todos |
| R2 | Buscar livro por id existente → devolve o livro |
| R3 | Buscar livro por id inexistente → **404** |
| R4 | Criar livro **válido** (título, páginas ≥ 1, autor e editora existentes) → **201** |
| R5 | Criar livro **sem os campos obrigatórios** → **não cria** (erro do cliente → **400**) |
| R6 | Criar livro apontando para **autor ou editora que não existe** → **não cria** (400/404) |
| R7 | Criar livro com **páginas inválidas** (0 ou negativo) → **não cria** (**400**) |
| R8 | Atualizar livro existente → padroniza em **204** (sucesso sem corpo) |
| R9 | Excluir livro existente → **204**; inexistente → **404** |
| R10 | Listar os livros de um autor (`GET /autores/1/livros`) → só os daquele autor |

> ⚠️ Alguns desses requisitos **o código ainda NÃO cumpre** — de propósito. Seu teste vai
> **expor** isso (fica vermelho). Achar a falha **é** o exercício. Não conserte o código ainda:
> primeiro escreva o teste, rode, e **anote o que realmente aconteceu**.

---

## 1. Projete os casos com as técnicas (Aula 05)

Não pule pro código. Preencha primeiro, no papel ou num comentário:

### a) Particionamento de equivalência + valor limite — o campo `paginas`
Divida `paginas` em **classes** e escolha **um representante de cada**, mais os **valores limite**.

- Classe inválida (páginas ≤ 0): representante = `____`
- **Limite**: `0` (inválido) · `1` (válido) → os dois viram teste
- Classe válida (páginas ≥ 1): representante = `____`

### b) Tabela de decisão — a criação depende de **duas** condições
Preencha a saída **correta** (segundo os requisitos) de cada combinação:

| Autor existe? | Editora existe? | → criar livro deveria… |
|:---:|:---:|---|
| Sim | Sim | `____` (ex.: 201) |
| Sim | Não | `____` |
| Não | Sim | `____` |
| Não | Não | `____` |

Cada **linha** é um caso de teste. (Dica: só uma linha cria; as outras são contorno.)

### c) Transição de estados — **não se aplica aqui**
Livro não tem estados (não é "novo → pago → enviado"). **Reconhecer que uma técnica NÃO
serve pro problema também é a habilidade.** Guarde a transição de estados para um recurso com
ciclo de vida (ex.: um *empréstimo*: disponível → emprestado → devolvido).

---

## 2. Matriz de rastreabilidade (Aula 06) — preencha conforme for testando

Ligue cada requisito ao(s) caso(s) que o cobre e ao resultado real. **A coluna "status real"
é o coração do desafio**: onde o esperado ≠ real, você achou uma falha.

| Req | Caso de teste (`it`) | Esperado | Status real | Bate? |
|---|---|---|---|:---:|
| R1 | `GET /livros → 200 e N livros` | 200 | `____` | |
| R4 | `POST /livros válido → 201` | 201 | `____` | |
| R5 | `POST /livros {} → 400` | 400 | `____` | |
| R6 | `POST /livros autor_id 999 → 400/404` | 400/404 | `____` | |
| R7 | `POST /livros paginas 0 → 400` | 400 | `____` | |
| R8 | `PUT /livros/1 → 204` | 204 | `____` | |
| R10 | `GET /autores/1/livros → 2 livros` | 2 | `____` | |

> Ao final, toda linha com "Bate? = não" vira uma conversa: **é bug do código ou decisão de
> convenção?** (lembra do 500→400 e do 200→204 que discutimos com editoras).

---

## 3. O TODO — escreva os testes (`tests/routes/livros.test.ts`)

Comece com **só `describe` + `it.todo`** (o plano). Depois implemente **um por vez**, rode, anote.

**Caminho feliz + relacional**
- [ ] `GET /livros` → 200 e a quantidade da semente
- [ ] `GET /livros/1` → 200, `titulo` = "O Hobbit"
- [ ] `GET /livros/999` → 404
- [ ] `POST /livros` **válido** (autor e editora que existem, páginas ≥ 1) → 201, e o corpo tem `id`
- [ ] `GET /autores/1/livros` → **2** livros (o Tolkien)
- [ ] **Relacional de verdade:** depois de um `POST /livros` para a editora 2, `GET /editoras/2/livros` **cresce em 1** e inclui o livro criado

**Contorno — aqui mora a descoberta (escreva o teste ESPERANDO o certo; veja o que volta)**
- [ ] `POST /livros` com **body vazio** → você espera **400**. Rodou? Deu o quê?
- [ ] `POST /livros` com **`autor_id: 999`** (não existe) → você espera **400/404**. Rodou? Deu o quê?
- [ ] `POST /livros` com **`paginas: 0`** → você espera **400**. Rodou? Deu o quê?
- [ ] `PUT /livros/1` → você espera **204** (convenção). Rodou? Deu o quê?

> 🔎 Nos quatro de contorno, o teste provavelmente vai **falhar** — e está **certo** que falhe.
> Ele está apontando o que a API ainda não faz. **Não conserte agora**: anote na matriz. O
> conserto (validação → 400, checar existência do autor/editora, padronizar 204) a gente faz
> **junto, ao vivo**, depois — igual fizemos com editoras.

---

## 4. Fluxo obrigatório (igual ao `TESTES.md`)

1. **Plano primeiro**: arquivo só com `describe` + `it.todo`. **Commit:** `test: plano do desafio de livros`.
2. **Resolva um por vez**: implementa, roda, verde (ou vermelho anotado), **commit**. Um por caso.
3. **Commits semânticos** (`test:` `feat:` `fix:` `docs:`) — o Husky recusa fora do padrão.
4. **ESLint limpo** (`npm run lint`).

Padrão de um teste (mesmas convenções dos testes de editora já no repo — `resetarBanco`
re-semeia antes de cada teste, então tudo começa de `tests/routes/`):

```ts
import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';

// zera e re-semeia o banco antes de CADA teste (nenhum depende do outro)
beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Livros — desafio', () => {
  it('POST /livros com autor_id inexistente NÃO cria', async () => {
    const r = await request(app)
      .post('/livros')
      .send({ titulo: 'Fantasma', paginas: 100, autor_id: 999, editora_id: 1 });
    // qual status VOCÊ espera aqui? rode e compare:
    expect(r.status).toBe(400);
  });
});
```

Entrega: o arquivo de teste + a **matriz da seção 2 preenchida** (pode ser num comentário no topo
do arquivo, ou num `.md` seu). O que importa é você conseguir **explicar cada linha que não bateu**.

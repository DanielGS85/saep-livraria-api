import { db } from '../lib/db';

// Sem ORM: o schema é SQL explícito. Quem cria as tabelas é o db:reset
// (rodado uma vez contra o banco), não a aplicação.

export async function criarSchema(): Promise<void> {
  const sql = db();
  await sql`
    CREATE TABLE IF NOT EXISTS autores (
      id            SERIAL PRIMARY KEY,
      nome          VARCHAR NOT NULL,
      nacionalidade VARCHAR NOT NULL,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS editoras (
      id         SERIAL PRIMARY KEY,
      nome       VARCHAR NOT NULL,
      cidade     VARCHAR NOT NULL,
      email      VARCHAR NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS livros (
      id         SERIAL PRIMARY KEY,
      titulo     VARCHAR NOT NULL,
      paginas    INT NOT NULL,
      autor_id   INT NOT NULL,
      editora_id INT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
}

/** Zera as tabelas e reinicia os ids (autores viram 1..3, editoras 1..4). */
export async function limpar(): Promise<void> {
  const sql = db();
  await sql`TRUNCATE livros, editoras, autores RESTART IDENTITY CASCADE`;
}

/** Insere a semente: 3 autores, 4 editoras, 5 livros (Tolkien com 2). */
export async function semear(): Promise<void> {
  const sql = db();

  const autores = [
    { nome: 'JRR Tolkien', nacionalidade: 'sul-africano' },
    { nome: 'Ursula LeGuin', nacionalidade: 'estadunidense' },
    { nome: 'Machado de Assis', nacionalidade: 'brasileira' },
  ];
  await sql`INSERT INTO autores ${sql(autores, 'nome', 'nacionalidade')}`;

  const editoras = [
    { nome: 'Europa-América', cidade: 'Lisboa', email: 'e@e.com' },
    { nome: 'Morro Branco', cidade: 'São Paulo', email: 'm@m.com' },
    { nome: 'Aleph', cidade: 'São Paulo', email: 'al@al.com' },
    { nome: 'Ateliê', cidade: 'São Paulo', email: 'a@a.com' },
  ];
  await sql`INSERT INTO editoras ${sql(editoras, 'nome', 'cidade', 'email')}`;

  const livros = [
    { titulo: 'O Hobbit', paginas: 230, autor_id: 1, editora_id: 1 },
    { titulo: 'O Silmarillion', paginas: 400, autor_id: 1, editora_id: 1 },
    { titulo: 'O Feiticeiro de Terramar', paginas: 450, autor_id: 2, editora_id: 2 },
    { titulo: 'Os Despossuídos', paginas: 300, autor_id: 2, editora_id: 3 },
    { titulo: 'Memórias Póstumas de Brás Cubas', paginas: 150, autor_id: 3, editora_id: 4 },
  ];
  await sql`INSERT INTO livros ${sql(livros, 'titulo', 'paginas', 'autor_id', 'editora_id')}`;
}

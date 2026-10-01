import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

type Editora = { id: number; nome: string; cidade: string; email: string };
type Autor = { id: number; nome: string; nacionalidade: string };
type Livro = { id: number; titulo: string; paginas: number };

export default async function Home() {
  const sql = db();
  const editoras = (await sql`SELECT * FROM editoras ORDER BY id`) as unknown as Editora[];
  const autores = (await sql`SELECT * FROM autores ORDER BY id`) as unknown as Autor[];
  const livros = (await sql`SELECT * FROM livros ORDER BY id`) as unknown as Livro[];

  return (
    <main style={{ maxWidth: 720, margin: '0 auto' }}>
      <h1>📚 Livraria</h1>
      <p>
        API em <strong>Next.js + Postgres</strong>. Front simples servido pelo mesmo projeto
        — a API está em <code>/api/editoras</code>, <code>/api/autores</code>, <code>/api/livros</code>.
      </p>

      <h2>Editoras ({editoras.length})</h2>
      <ul>
        {editoras.map((e) => (
          <li key={e.id}>{e.nome} — {e.cidade}</li>
        ))}
      </ul>

      <h2>Autores ({autores.length})</h2>
      <ul>
        {autores.map((a) => (
          <li key={a.id}>{a.nome} ({a.nacionalidade})</li>
        ))}
      </ul>

      <h2>Livros ({livros.length})</h2>
      <ul>
        {livros.map((l) => (
          <li key={l.id}>{l.titulo} — {l.paginas}p</li>
        ))}
      </ul>
    </main>
  );
}

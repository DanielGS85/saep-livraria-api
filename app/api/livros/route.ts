import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /livros — lista todos
export async function GET() {
  const sql = db();
  const livros = await sql`SELECT * FROM livros ORDER BY id ASC`;
  return Response.json(livros);
}

// POST /livros — cria. SEM validação e SEM checagem de FK (de propósito):
// body vazio -> NOT NULL -> 500; autor_id/editora_id inexistentes -> cria
// "livro órfão" (201). No DESAFIO, o conserto é validar e checar existência.
export async function POST(request: Request) {
  const sql = db();
  const d = (await request.json()) as {
    titulo?: string;
    paginas?: number;
    autor_id?: number;
    editora_id?: number;
  };
  try {
    const [livro] = await sql`
      INSERT INTO livros (titulo, paginas, autor_id, editora_id)
      VALUES (${d.titulo ?? null}, ${d.paginas ?? null}, ${d.autor_id ?? null}, ${d.editora_id ?? null})
      RETURNING *`;
    return Response.json(livro, { status: 201 });
  } catch {
    return Response.json({ erro: 'Erro ao criar livro' }, { status: 500 });
  }
}

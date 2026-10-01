import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

// GET /livros/:id
export async function GET(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const sql = db();
  const [livro] = await sql`SELECT * FROM livros WHERE id = ${Number(id)}`;
  if (!livro) {
    return Response.json({ erro: 'Livro não encontrado' }, { status: 404 });
  }
  return Response.json(livro);
}

// PUT /livros/:id
export async function PUT(request: Request, { params }: Ctx) {
  const { id } = await params;
  const sql = db();
  const d = (await request.json()) as {
    titulo?: string;
    paginas?: number;
    autor_id?: number;
    editora_id?: number;
  };

  const [livro] = await sql`
    UPDATE livros SET
      titulo     = COALESCE(${d.titulo ?? null}, titulo),
      paginas    = COALESCE(${d.paginas ?? null}, paginas),
      autor_id   = COALESCE(${d.autor_id ?? null}, autor_id),
      editora_id = COALESCE(${d.editora_id ?? null}, editora_id),
      updated_at = now()
    WHERE id = ${Number(id)}
    RETURNING *`;

  if (!livro) {
    return Response.json({ erro: 'Livro não encontrado' }, { status: 404 });
  }
  return Response.json(livro);
}

// DELETE /livros/:id
export async function DELETE(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const sql = db();
  const resultado = await sql`DELETE FROM livros WHERE id = ${Number(id)}`;
  if (resultado.count === 0) {
    return Response.json({ erro: 'Livro não encontrado' }, { status: 404 });
  }
  return new Response(null, { status: 204 });
}

import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

// GET /autores/:id
export async function GET(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const sql = db();
  const [autor] = await sql`SELECT * FROM autores WHERE id = ${Number(id)}`;
  if (!autor) {
    return Response.json({ erro: 'Autor não encontrado' }, { status: 404 });
  }
  return Response.json(autor);
}

// PUT /autores/:id
export async function PUT(request: Request, { params }: Ctx) {
  const { id } = await params;
  const sql = db();
  const dados = (await request.json()) as { nome?: string; nacionalidade?: string };

  const [autor] = await sql`
    UPDATE autores SET
      nome          = COALESCE(${dados.nome ?? null}, nome),
      nacionalidade = COALESCE(${dados.nacionalidade ?? null}, nacionalidade),
      updated_at = now()
    WHERE id = ${Number(id)}
    RETURNING *`;

  if (!autor) {
    return Response.json({ erro: 'Autor não encontrado' }, { status: 404 });
  }
  return Response.json(autor);
}

// DELETE /autores/:id
export async function DELETE(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const sql = db();
  const resultado = await sql`DELETE FROM autores WHERE id = ${Number(id)}`;
  if (resultado.count === 0) {
    return Response.json({ erro: 'Autor não encontrado' }, { status: 404 });
  }
  return new Response(null, { status: 204 });
}

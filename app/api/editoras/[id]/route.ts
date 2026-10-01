import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

// GET /editoras/:id
export async function GET(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const sql = db();
  const [editora] = await sql`SELECT * FROM editoras WHERE id = ${Number(id)}`;
  if (!editora) {
    return Response.json({ erro: 'Editora não encontrada' }, { status: 404 });
  }
  return Response.json(editora);
}

// PUT /editoras/:id — atualiza os campos enviados (devolve 200 com o recurso)
export async function PUT(request: Request, { params }: Ctx) {
  const { id } = await params;
  const sql = db();
  const dados = (await request.json()) as {
    nome?: string;
    cidade?: string;
    email?: string;
  };

  const [editora] = await sql`
    UPDATE editoras SET
      nome   = COALESCE(${dados.nome ?? null}, nome),
      cidade = COALESCE(${dados.cidade ?? null}, cidade),
      email  = COALESCE(${dados.email ?? null}, email),
      updated_at = now()
    WHERE id = ${Number(id)}
    RETURNING *`;

  if (!editora) {
    return Response.json({ erro: 'Editora não encontrada' }, { status: 404 });
  }
  return Response.json(editora);
}

// DELETE /editoras/:id — 204 se removeu, 404 se não existia
export async function DELETE(_request: Request, { params }: Ctx) {
  const { id } = await params;
  const sql = db();
  const resultado = await sql`DELETE FROM editoras WHERE id = ${Number(id)}`;
  if (resultado.count === 0) {
    return Response.json({ erro: 'Editora não encontrada' }, { status: 404 });
  }
  return new Response(null, { status: 204 });
}

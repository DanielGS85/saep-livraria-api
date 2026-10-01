import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /autores/:id/livros — os livros daquele autor
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sql = db();
  const livros = await sql`SELECT * FROM livros WHERE autor_id = ${Number(id)} ORDER BY id ASC`;
  return Response.json(livros);
}

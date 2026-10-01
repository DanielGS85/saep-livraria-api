import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /editoras/:id/livros — os livros daquela editora
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sql = db();
  const livros = await sql`SELECT * FROM livros WHERE editora_id = ${Number(id)} ORDER BY id ASC`;
  return Response.json(livros);
}

import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /autores — lista todos
export async function GET() {
  const sql = db();
  const autores = await sql`SELECT * FROM autores ORDER BY id ASC`;
  return Response.json(autores);
}

// POST /autores — cria. SEM validação de propósito: campo faltando vira erro
// do banco (NOT NULL) -> 500. No DESAFIO, o conserto é validar e devolver 400.
export async function POST(request: Request) {
  const sql = db();
  const dados = (await request.json()) as { nome?: string; nacionalidade?: string };
  try {
    const [autor] = await sql`
      INSERT INTO autores (nome, nacionalidade)
      VALUES (${dados.nome ?? null}, ${dados.nacionalidade ?? null})
      RETURNING *`;
    return Response.json(autor, { status: 201 });
  } catch {
    return Response.json({ erro: 'Erro ao criar autor' }, { status: 500 });
  }
}

import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

// GET /editoras — lista todas
export async function GET() {
  const sql = db();
  const editoras = await sql`SELECT * FROM editoras ORDER BY id ASC`;
  return Response.json(editoras);
}

// POST /editoras — cria (com validação de contorno: campos obrigatórios -> 400)
export async function POST(request: Request) {
  const sql = db();
  const dados = (await request.json()) as {
    nome?: string;
    cidade?: string;
    email?: string;
  };

  if (!dados.nome || !dados.cidade || !dados.email) {
    return Response.json(
      { error: 'nome, cidade e email são obrigatórios' },
      { status: 400 },
    );
  }

  const [editora] = await sql`
    INSERT INTO editoras (nome, cidade, email)
    VALUES (${dados.nome}, ${dados.cidade}, ${dados.email})
    RETURNING *`;
  return Response.json(editora, { status: 201 });
}

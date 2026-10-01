import postgres from 'postgres';

// Conexão única com o Postgres (SQL cru, sem ORM).
//
// Guardamos a instância no globalThis para:
//  - DEV (Next): sobreviver ao hot-reload sem abrir conexão nova a cada troca;
//  - PRODUÇÃO (serverless): reusar a conexão entre invocações "quentes";
//  - TESTES: `fecharDb()` zera o cache, então cada arquivo reabre se precisar.
//
// Supabase exige SSL; local (localhost) não. Decidimos pela própria URL.

const g = globalThis as unknown as { _sql?: ReturnType<typeof postgres> };

export function db(): ReturnType<typeof postgres> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL não definida (cadastre no .env ou no ambiente).');
  }
  if (!g._sql) {
    const local = url.includes('localhost') || url.includes('127.0.0.1');
    g._sql = postgres(url, {
      ssl: local ? false : 'require',
      onnotice: () => {}, // silencia avisos tipo "table already exists"
    });
  }
  return g._sql;
}

/** Fecha a conexão (use no afterAll dos testes, pro Jest encerrar limpo). */
export async function fecharDb(): Promise<void> {
  if (g._sql) {
    await g._sql.end();
    g._sql = undefined;
  }
}

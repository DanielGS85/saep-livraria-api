import 'dotenv/config';
import { criarSchema, limpar, semear } from '../db/seed';
import { fecharDb } from '../lib/db';

// Roda com: npm run db:reset  (tsx scripts/reset-db.ts)
// Usa a DATABASE_URL do ambiente (.env local, ou a do Render/Supabase se você
// exportar antes). Cria o schema, zera e semeia.
async function main(): Promise<void> {
  await criarSchema();
  await limpar();
  await semear();
  console.log('Banco resetado (schema + seed).');
  await fecharDb();
}

main().catch((erro: unknown) => {
  console.error('Falha no db:reset:', erro);
  process.exit(1);
});

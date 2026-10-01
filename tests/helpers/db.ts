import { criarSchema, limpar, semear } from '@/db/seed';
import { fecharDb } from '@/lib/db';

/** Garante o schema, zera e recoloca a semente. Use no beforeEach. */
export async function resetarBanco(): Promise<void> {
  await criarSchema();
  await limpar();
  await semear();
}

/** Fecha a conexão pro Jest encerrar sem "open handles". Use no afterAll. */
export async function fecharBanco(): Promise<void> {
  await fecharDb();
}

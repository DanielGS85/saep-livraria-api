import nextJest from 'next/jest.js';

// next/jest configura o transform (SWC), o alias "@/..." (do tsconfig) e o
// carregamento das variáveis de ambiente (.env). Assim os testes importam os
// route handlers direto, sem supertest nem servidor Express.
const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
};

export default createJestConfig(config);

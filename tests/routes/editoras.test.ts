import { GET, POST } from '@/app/api/editoras/route';
import { GET as mostrar, PUT, DELETE } from '@/app/api/editoras/[id]/route';
import { resetarBanco, fecharBanco } from '../helpers/db';

// Sem supertest: o route handler é só uma função Request -> Response.
// A gente chama direto e confere o status/corpo da Response que volta.
beforeEach(resetarBanco);
afterAll(fecharBanco);

// helpers pequenos pra montar o Request e os params ([id] é assíncrono no Next)
function post(body: unknown) {
  return new Request('http://test/api/editoras', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}
function put(body: unknown) {
  return new Request('http://test/api/editoras/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });

describe('Rotas de editora', () => {
  test('GET /editoras devolve 200 e 4 editoras', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toHaveLength(4);
  });

  test('GET /editoras/1 retorna a editora correta', async () => {
    const res = await mostrar(new Request('http://test/api/editoras/1'), ctx('1'));
    expect(res.status).toBe(200);
    expect((await res.json()).nome).toBe('Europa-América');
  });

  test('GET /editoras/999 retorna 404', async () => {
    const res = await mostrar(new Request('http://test/api/editoras/999'), ctx('999'));
    expect(res.status).toBe(404);
  });

  test('POST /editoras cria e retorna 201', async () => {
    const res = await POST(post({ nome: 'Editora Senai', cidade: 'Petrópolis', email: 'editora@senai.com.br' }));
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual(
      expect.objectContaining({ nome: 'Editora Senai', cidade: 'Petrópolis' }),
    );
  });

  test('PUT /editoras/1 atualiza e retorna 200', async () => {
    const res = await PUT(put({ cidade: 'Rio de Janeiro' }), ctx('1'));
    expect(res.status).toBe(200);
    expect((await res.json()).cidade).toBe('Rio de Janeiro');
  });

  test('DELETE /editoras/1 retorna 204', async () => {
    const res = await DELETE(new Request('http://test/api/editoras/1', { method: 'DELETE' }), ctx('1'));
    expect(res.status).toBe(204);
  });

  test('DELETE /editoras/999 retorna 404', async () => {
    const res = await DELETE(new Request('http://test/api/editoras/999', { method: 'DELETE' }), ctx('999'));
    expect(res.status).toBe(404);
  });

  test('POST com body vazio NÃO cria e retorna 400', async () => {
    const res = await POST(post({}));
    expect(res.status).toBe(400);
  });
});

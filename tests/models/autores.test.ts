import request from 'supertest';
import { resetarBanco, fecharBanco } from '../helpers/db';
import app from '../../src/app';

beforeEach(resetarBanco);
afterAll(fecharBanco);

describe('Rotas de autor', () => {

  test('GET /autor retorna sattus 200', async () => {
    const res = await request(app).get(`/autor`);
    expect(res.status).toBe(200);
  });

  test('GET /autor retorna 1 devolve status 200 e nome correto', async () => {
    const res = await request(app).get(`/autor/1`);
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('JRR Tolkien');
  });

  test('GET /autores/999 retorna status 404', async () => {
    const res = await request(app).get(`/autor/999`);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Autor não encontrado" });
  });

  test('POST /autores válido retorna 201/:id',async () => {
    const res = await request(app).post('/autores')
      .send(
        {
            nome:

      }
    );

  test('POST /autores com body vazio → 400');

  test('PUT /autores/1 → 200 com nova nacionalidade');

  test('PUT /autores/999 → 404');

  test('DELETE /autores/3 → 204');

  test('DELETE /autores/999 → 404');

  test('GET /autores/1/livros → 2 livros');

  test('GET /autores/3/livros → 1 livro');

});
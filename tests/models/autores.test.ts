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

  test('POST /autores válido retorna 201/:id', async () => {
    const res = await request(app).post('/autores')
      .send({
        nome: "autor teste",
        nacionalidade: "brasileiro"
      });
    expect(res.status).toBe(201);
      expect(res.body).toEqual(expect.objectContaining({
        nome: "autor teste",
      }));
    });

  test('POST /autores com body vazio deve retornar 400 Bad Request', async () => {
    const res = await request(app).post(`/autores`).send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Requisição inválida" });
  });

  test('PUT /autores/1 retorna 200 com nova nacionalidade', async() =>{
    const res = await request(app).put('/autores/1')
      .send({
        nacionalidade: "britânico"
      });
    expect(res.status).toBe(200);
  });

  test('PUT /autores/999 deve retornar 404 Not Found', async() =>{
    const res =await request(app).put(`/autores/999`)
      .send({
         nome: "autor teste2",
         nacioanalidade: "americano"
      })
      expect(res.status).toBe(404)
  });

  test('DELETE /autores com id=3 deve retornar 204 No Content e remover o autor',async() =>{
    const res = await request(app).delete(`/autores/3`);
    expect(res.status).toBe(204)
  });


  test('DELETE /autores/id:999 deve retornar 404 Not Found', async() =>{
    const res = await request(app).delete(`/autores/999`);
    expect(res.status).toBe(404);
  });


  test('GET /autores/1/livros deve retornar lista com 2 livros do autor id=1', async() =>{
    const res = await request(app).get(`/autores/1/livros`);
    expect(res.status).toBe(200);
  });
  
  test('GET /autores/3/livros deve retornar lista com 1 livrro do autor id:3', async() =>{
    const res = await request(app).get(`/autores/3/livros`)
    expect(res.status).toBe(200);
  });
});
import request from 'supertest';
import app from '../app';

describe('Teste de integração - EduLivre', () => {

    test('GET / deve retornar 200', async () => {
        const result = await request(app).get('/');
        expect(result.statusCode).toEqual(200);
    });

    test('POST /login sem credenciais deve retornar 401 ou 500', async () => {
        const result = await request(app)
            .post('/login')
            .send({ email: 'inexistente@test.com', password: '123456' });
        expect([401, 500]).toContain(result.statusCode);
    });

    test('POST /usuarios com dados inválidos deve retornar 400', async () => {
        const result = await request(app)
            .post('/usuarios')
            .send({ name: 'Teste' });
        expect(result.statusCode).toEqual(400);
    });

    test('GET /usuarios sem token deve retornar 403', async () => {
        const result = await request(app).get('/usuarios');
        expect(result.statusCode).toEqual(403);
    });

    test('GET /aulas sem token deve retornar 403', async () => {
        const result = await request(app).get('/aulas');
        expect(result.statusCode).toEqual(403);
    });

    test('GET /agendamentos sem token deve retornar 403', async () => {
        const result = await request(app).get('/agendamentos');
        expect(result.statusCode).toEqual(403);
    });

});
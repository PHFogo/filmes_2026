import request from 'supertest';
import app from '../app';

describe('Teste de integracao', () => {

    test('Teste de buscar usuário', async () => {
        const result = await request(app).get('/users');
    
        expect(result.statusCode).toEqual(200);
    });

    test('Teste de buscar usuário por ID', async () => {
        const result = await request(app).get('/users/1');
    
        expect(result.statusCode).toEqual(200);
    });

    test('Teste de buscar usuário por ID ERROR', async () => {
        const result = await request(app).get('/users/99999');
    
        expect(result.statusCode).toEqual(200);
    });

});
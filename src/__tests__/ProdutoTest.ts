import { Produto } from "../models/Produto";

describe('Teste da classe de Produto', () => {

    test('Teste do cálculo de desconto', () => {
        const produto = new Produto('Iphone 17', 8000);
        expect(produto.calcularDesconto(10)).toBe(7200);
        expect(produto.calcularDesconto(20)).toBe(6400);
    });

    test('Teste taxa menor que zero', () => {
        const produto = new Produto('Iphone 17', 8000);
        expect(() => produto.calcularDesconto(-10)).toThrow(new Error("Percentual de desconto deve estar entre 0 e 100."));
    });

    test('Teste taxa maior que zero', () => {
        const produto = new Produto('Iphone 17', 8000);
        expect(() => produto.calcularDesconto(150)).toThrow(new Error("Percentual de desconto deve estar entre 0 e 100."));
    });

});
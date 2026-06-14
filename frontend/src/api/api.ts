import { Categoria } from '../types/Categoria.js';
import { Transacao } from '../types/Transacao.js';

const BASE_URL = 'http://localhost:3000/api';

export const CategoriaAPI = {
    async listar(): Promise<Categoria[]> {
        const response = await fetch(`${BASE_URL}/categorias`);
        return response.json();
    },

    async criar(categoria: Categoria): Promise<Categoria> {
        const response = await fetch(`${BASE_URL}/categorias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        });

        return response.json();
    }
};

export const TransacaoAPI = {
    async listar(): Promise<Transacao[]> {
        const response = await fetch(`${BASE_URL}/transacoes`);
        return response.json();
    },

    async criar(transacao: Transacao): Promise<Transacao> {
        const response = await fetch(`${BASE_URL}/transacoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transacao)
        });

        return response.json();
    },

    async atualizar(id: number, transacao: Transacao): Promise<Transacao> {
        const response = await fetch(`${BASE_URL}/transacoes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transacao)
        });

        return response.json();
    },

    async excluir(id: number): Promise<void> {
        await fetch(`${BASE_URL}/transacoes/${id}`, {
            method: 'DELETE'
        });
    }
};
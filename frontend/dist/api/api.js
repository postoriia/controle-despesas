const BASE_URL = 'http://localhost:3000/api';
export const CategoriaAPI = {
    async listar() {
        const response = await fetch(`${BASE_URL}/categorias`);
        return response.json();
    },
    async criar(categoria) {
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
    async listar() {
        const response = await fetch(`${BASE_URL}/transacoes`);
        return response.json();
    },
    async criar(transacao) {
        const response = await fetch(`${BASE_URL}/transacoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transacao)
        });
        return response.json();
    },
    async atualizar(id, transacao) {
        const response = await fetch(`${BASE_URL}/transacoes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transacao)
        });
        return response.json();
    },
    async excluir(id) {
        await fetch(`${BASE_URL}/transacoes/${id}`, {
            method: 'DELETE'
        });
    }
};

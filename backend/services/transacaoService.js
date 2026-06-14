const TransacaoModel = require('../models/transacaoModel');

const TransacaoService = {
    getAllTransacoes: (callback) => {
        TransacaoModel.getAll(callback);
    },

    getTransacaoById: (id, callback) => {
        TransacaoModel.getById(id, callback);
    },

    createTransacao: (dados, callback) => {
        const { descricao, valor, tipo } = dados;
        
        // Validações básicas de negócio
        if (!descricao || descricao.trim() === '') return callback(new Error('A descrição é obrigatória.'));
        if (!valor || valor <= 0) return callback(new Error('O valor deve ser maior que zero.'));
        if (tipo !== 'Receita' && tipo !== 'Despesa') return callback(new Error('O tipo deve ser Receita ou Despesa.'));

        TransacaoModel.create(dados, callback);
    },

    updateTransacao: (id, dados, callback) => {
        const { descricao, valor, tipo } = dados;

        if (!descricao || descricao.trim() === '') return callback(new Error('A descrição é obrigatória.'));
        if (!valor || valor <= 0) return callback(new Error('O valor deve ser maior que zero.'));
        if (tipo !== 'Receita' && tipo !== 'Despesa') return callback(new Error('O tipo deve ser Receita ou Despesa.'));

        TransacaoModel.update(id, dados, callback);
    },

    deleteTransacao: (id, callback) => {
        TransacaoModel.delete(id, callback);
    }
};

module.exports = TransacaoService;
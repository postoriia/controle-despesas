const TransacaoService = require('../services/transacaoService');

const TransacaoController = {
    // GET /api/transacoes
    getAll: (req, res) => {
        TransacaoService.getAllTransacoes((err, transacoes) => {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            res.json(transacoes);
        });
    },

    // GET /api/transacoes/:id
    getById: (req, res) => {
        const id = req.params.id;
        TransacaoService.getTransacaoById(id, (err, transacao) => {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            if (!transacao) {
                return res.status(404).json({ mensagem: 'Transação não encontrada.' });
            }
            res.json(transacao);
        });
    },

    // POST /api/transacoes
    create: (req, res) => {
        const { descricao, valor, tipo, categoria_id } = req.body;
        const dados = { descricao, valor, tipo, categoria_id: categoria_id || null };

        TransacaoService.createTransacao(dados, (err, id) => {
            if (err) {
                return res.status(400).json({ erro: err.message });
            }
            res.status(201).json({ id, ...dados });
        });
    },

    // PUT /api/transacoes/:id
    update: (req, res) => {
        const id = req.params.id;
        const { descricao, valor, tipo, categoria_id } = req.body;
        const dados = { descricao, valor, tipo, categoria_id: categoria_id || null };

        TransacaoService.updateTransacao(id, dados, (err, alterado) => {
            if (err) {
                return res.status(400).json({ erro: err.message });
            }
            if (alterado === 0) {
                return res.status(404).json({ mensagem: 'Transação não encontrada para atualizar.' });
            }
            res.json({ id, ...dados, mensagem: 'Transação atualizada com sucesso.' });
        });
    },

    // DELETE /api/transacoes/:id
    delete: (req, res) => {
        const id = req.params.id;
        TransacaoService.deleteTransacao(id, (err, deletado) => {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            if (deletado === 0) {
                return res.status(404).json({ mensagem: 'Transação não encontrada para excluir.' });
            }
            res.json({ mensagem: 'Transação excluída com sucesso.' });
        });
    }
};

module.exports = TransacaoController;
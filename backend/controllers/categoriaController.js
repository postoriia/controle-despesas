const CategoriaService = require('../services/categoriaService');

const CategoriaController = {
    // GET /api/categorias
    getAll: (req, res) => {
        CategoriaService.getAllCategorias((err, categorias) => {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            res.json(categorias);
        });
    },

    // GET /api/categorias/:id
    getById: (req, res) => {
        const id = req.params.id;
        CategoriaService.getCategoriaById(id, (err, categoria) => {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            if (!categoria) {
                return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
            }
            res.json(categoria);
        });
    },

    // POST /api/categorias
    create: (req, res) => {
        const { nome } = req.body;
        CategoriaService.createCategoria(nome, (err, id) => {
            if (err) {
                // Tratamento simples caso o nome seja duplicado (UNIQUE no banco)
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ erro: 'Já existe uma categoria com este nome.' });
                }
                return res.status(500).json({ erro: err.message });
            }
            res.status(201).json({ id, nome });
        });
    },

    // PUT /api/categorias/:id
    update: (req, res) => {
        const id = req.params.id;
        const { nome } = req.body;
        CategoriaService.updateCategoria(id, nome, (err, alterado) => {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ erro: 'Já existe uma categoria com este nome.' });
                }
                return res.status(500).json({ erro: err.message });
            }
            if (alterado === 0) {
                return res.status(404).json({ mensagem: 'Categoria não encontrada para atualizar.' });
            }
            res.json({ id, nome, mensagem: 'Categoria atualizada com sucesso.' });
        });
    },

    // DELETE /api/categorias/:id
    delete: (req, res) => {
        const id = req.params.id;
        CategoriaService.deleteCategoria(id, (err, deletado) => {
            if (err) {
                return res.status(500).json({ erro: err.message });
            }
            if (deletado === 0) {
                return res.status(404).json({ mensagem: 'Categoria não encontrada para excluir.' });
            }
            res.json({ mensagem: 'Categoria excluída com sucesso.' });
        });
    }
};

module.exports = CategoriaController;
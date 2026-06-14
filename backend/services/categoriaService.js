const CategoriaModel = require('../models/categoriaModel');

const CategoriaService = {
    getAllCategorias: (callback) => {
        CategoriaModel.getAll(callback);
    },

    getCategoriaById: (id, callback) => {
        CategoriaModel.getById(id, callback);
    },

    createCategoria: (nome, callback) => {
        if (!nome || nome.trim() === '') {
            return callback(new Error('O nome da categoria é obrigatório.'));
        }
        CategoriaModel.create(nome, callback);
    },

    updateCategoria: (id, nome, callback) => {
        if (!nome || nome.trim() === '') {
            return callback(new Error('O nome da categoria é obrigatório para atualização.'));
        }
        CategoriaModel.update(id, nome, callback);
    },

    deleteCategoria: (id, callback) => {
        CategoriaModel.delete(id, callback);
    }
};

module.exports = CategoriaService;
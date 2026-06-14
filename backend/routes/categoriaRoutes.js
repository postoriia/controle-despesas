const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/categoriaController');

// Mapeamento das rotas de categoria
router.get('/', CategoriaController.getAll);          // Listar todas
router.get('/:id', CategoriaController.getById);      // Buscar por ID
router.post('/', CategoriaController.create);         // Criar nova
router.put('/:id', CategoriaController.update);       // Atualizar por ID
router.delete('/:id', CategoriaController.delete);    // Excluir por ID

module.exports = router;
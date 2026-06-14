const express = require('express');
const router = express.Router();
const TransacaoController = require('../controllers/transacaoController');

// Mapeamento das rotas de transação
router.get('/', TransacaoController.getAll);          // Listar todas
router.get('/:id', TransacaoController.getById);      // Buscar por ID
router.post('/', TransacaoController.create);         // Criar nova
router.put('/:id', TransacaoController.update);       // Atualizar por ID
router.delete('/:id', TransacaoController.delete);    // Excluir por ID

module.exports = router;
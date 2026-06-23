const express = require('express');
const despesaService = require('../services/despesaService');
const router = express.Router();

router.post('/transacoes', (req, res) => {
  try {
    const { descricao, valor, tipo, categoria_id } = req.body;
    const nova = despesaService.criarTransacao(descricao, valor, tipo, categoria_id);
    res.status(201).json(nova);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.get('/transacoes', (req, res) => {
  try {
    res.json(despesaService.listarTransacoes());
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

router.delete('/transacoes/:id', (req, res) => {
  try {
    despesaService.removerTransacao(Number(req.params.id));
    res.json({ mensagem: 'Removido com sucesso.' });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.post('/categorias', (req, res) => {
  try {
    const { nome } = req.body;
    const nova = despesaService.criarCategoria(nome);
    res.status(201).json(nova);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.get('/categorias', (req, res) => {
  try {
    res.json(despesaService.listarCategorias());
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = router;
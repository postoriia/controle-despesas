const despesaModel = require('../models/despesaModel');

const despesaService = {
  criarTransacao(descricao, valor, tipo, categoria_id) {
    if (!descricao || descricao.trim() === '') throw new Error('A descrição é obrigatória.');
    if (!tipo || !['Receita', 'Despesa'].includes(tipo)) throw new Error('O tipo deve ser Receita ou Despesa.');
    
    const valorNumerico = Number(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) throw new Error('O valor deve ser um número maior que zero.');

    return despesaModel.criarTransacao(descricao.trim(), valorNumerico, tipo, categoria_id);
  },

  listarTransacoes() {
    return despesaModel.listarTransacoes();
  },

  removerTransacao(id) {
    return despesaModel.removerTransacao(id);
  },

  criarCategoria(nome) {
    if (!nome || nome.trim() === '') throw new Error('O nome da categoria é obrigatório.');
    return despesaModel.criarCategoria(nome.trim());
  },

  listarCategorias() {
    return despesaModel.listarCategorias();
  }
};

module.exports = despesaService;
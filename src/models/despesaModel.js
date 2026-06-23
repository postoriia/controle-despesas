const db = require('../db');

const despesaModel = {

  criarTransacao(descricao, valor, tipo, categoria_id) {
    const stmt = db.prepare('INSERT INTO transacoes (descricao, valor, tipo, categoria_id) VALUES (?, ?, ?, ?)');
    const info = stmt.run(descricao, valor, tipo, categoria_id || null);
    return { id: info.lastInsertRowid, descricao, valor, tipo, categoria_id };
  },

  listarTransacoes() {
    const stmt = db.prepare(`
      SELECT t.*, c.nome as categoria_nome 
      FROM transacoes t 
      LEFT JOIN categorias c ON t.categoria_id = c.id 
      ORDER BY t.id DESC
    `);
    return stmt.all();
  },

  removerTransacao(id) {
    const stmt = db.prepare('DELETE FROM transacoes WHERE id = ?');
    const info = stmt.run(id);
    return info.changes > 0;
  },

  criarCategoria(nome) {
    const stmt = db.prepare('INSERT INTO categorias (nome) VALUES (?)');
    const info = stmt.run(nome);
    return { id: info.lastInsertRowid, nome };
  },

  listarCategorias() {
    const stmt = db.prepare('SELECT * FROM categorias ORDER BY nome ASC');
    return stmt.all();
  }
};

module.exports = despesaModel;
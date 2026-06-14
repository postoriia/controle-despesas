const db = require('../database/database');

const TransacaoModel = {
    // Retorna todas as transações, trazendo junto o nome da categoria
    getAll: (callback) => {
        const sql = `
            SELECT t.*, c.nome AS categoria_nome 
            FROM transacoes t
            LEFT JOIN categorias c ON t.categoria_id = c.id
            ORDER BY t.id DESC
        `;
        db.all(sql, [], (err, rows) => {
            callback(err, rows);
        });
    },

    // Retorna uma transação específica pelo ID
    getById: (id, callback) => {
        const sql = 'SELECT * FROM transacoes WHERE id = ?';
        db.get(sql, [id], (err, row) => {
            callback(err, row);
        });
    },

    // Cria uma nova transação
    create: (dados, callback) => {
        const { descricao, valor, tipo, categoria_id } = dados;
        const sql = 'INSERT INTO transacoes (descricao, valor, tipo, categoria_id) VALUES (?, ?, ?, ?)';
        db.run(sql, [descricao, valor, tipo, categoria_id], function (err) {
            callback(err, this ? this.lastID : null);
        });
    },

    // Atualiza uma transação existente
    update: (id, dados, callback) => {
        const { descricao, valor, tipo, categoria_id } = dados;
        const sql = 'UPDATE transacoes SET descricao = ?, valor = ?, tipo = ?, categoria_id = ? WHERE id = ?';
        db.run(sql, [descricao, valor, tipo, categoria_id, id], function (err) {
            callback(err, this ? this.changes : 0);
        });
    },

    // Deleta uma transação
    delete: (id, callback) => {
        const sql = 'DELETE FROM transacoes WHERE id = ?';
        db.run(sql, [id], function (err) {
            callback(err, this ? this.changes : 0);
        });
    }
};

module.exports = TransacaoModel;
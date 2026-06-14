const db = require('../database/database');

const CategoriaModel = {
    // Retorna todas as categorias
    getAll: (callback) => {
        const sql = 'SELECT * FROM categorias';
        db.all(sql, [], (err, rows) => {
            callback(err, rows);
        });
    },

    // Retorna uma categoria específica pelo ID
    getById: (id, callback) => {
        const sql = 'SELECT * FROM categorias WHERE id = ?';
        db.get(sql, [id], (err, row) => {
            callback(err, row);
        });
    },

    // Cria uma nova categoria
    create: (nome, callback) => {
        const sql = 'INSERT INTO categorias (nome) VALUES (?)';
        db.run(sql, [nome], function (err) {
            // function tradicional é usada aqui para termos acesso ao 'this.lastID'
            callback(err, this ? this.lastID : null);
        });
    },

    // Atualiza o nome de uma categoria
    update: (id, nome, callback) => {
        const sql = 'UPDATE categorias SET nome = ? WHERE id = ?';
        db.run(sql, [nome, id], function (err) {
            callback(err, this ? this.changes : 0);
        });
    },

    // Deleta uma categoria
    delete: (id, callback) => {
        const sql = 'DELETE FROM categorias WHERE id = ?';
        db.run(sql, [id], function (err) {
            callback(err, this ? this.changes : 0);
        });
    }
};

module.exports = CategoriaModel;
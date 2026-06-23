const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '../dados.db');
const db = new Database(dbPath, { verbose: console.log });

db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS transacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL,
    valor REAL NOT NULL,
    tipo TEXT CHECK(tipo IN ('Receita', 'Despesa')) NOT NULL,
    categoria_id INTEGER,
    data TEXT DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY(categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
  );
`);

const count = db.prepare('SELECT COUNT(*) as qtd FROM categorias').get();
if (count.qtd === 0) {
  const insert = db.prepare('INSERT INTO categorias (nome) VALUES (?)');
  ['Alimentação', 'Salário', 'Transporte', 'Lazer', 'Saúde'].forEach(cat => insert.run(cat));
}

module.exports = db;
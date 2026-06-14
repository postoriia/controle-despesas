const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define o caminho onde o arquivo do banco de dados será salvo (na raiz do backend)
const dbPath = path.resolve(__dirname, 'db.sqlite');

// Conecta ao banco de dados (se o arquivo não existir, o SQLite cria automaticamente)
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados SQLite:', err.message);
    } else {
        console.log('Conectado com sucesso ao banco de dados SQLite.');
    }
});

// Criação das tabelas dentro de uma query serializada (executada em ordem)
db.serialize(() => {
    // 1. Tabela de Categorias
    db.run(`
        CREATE TABLE IF NOT EXISTS categorias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL UNIQUE
        )
    `, (err) => {
        if (err) console.error('Erro ao criar tabela categorias:', err.message);
    });

    // 2. Tabela de Transações (com Chave Estrangeira apontando para Categoria)
    db.run(`
        CREATE TABLE IF NOT EXISTS transacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            descricao TEXT NOT NULL,
            valor REAL NOT NULL,
            tipo TEXT CHECK(tipo IN ('Receita', 'Despesa')) NOT NULL,
            categoria_id INTEGER,
            FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
        )
    `, (err) => {
        if (err) console.error('Erro ao criar tabela transacoes:', err.message);
    });
});

module.exports = db;
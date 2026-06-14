const express = require('express');
const cors = require('cors');
const categoriaRoutes = require('./routes/categoriaRoutes');
const transacaoRoutes = require('./routes/transacaoRoutes');

// Inicializa o aplicativo Express
const app = express();

// Define a porta do servidor
const PORT = 3000;

// Middleware para permitir requisições de outras origens (CORS)
app.use(cors());

// Middleware para permitir que o Express entenda corpos de requisições em formato JSON
app.use(express.json());

// Vincula as rotas criadas aos seus respectivos caminhos base (endpoints)
app.use('/api/categorias', categoriaRoutes);
app.use('/api/transacoes', transacaoRoutes);

// Rota base apenas para testar se o servidor está online pelo navegador
app.get('/', (req, res) => {
    res.send('Servidor do Controle de Despesas Pessoais está rodando com sucesso!');
});

// Inicializa o servidor na porta configurada
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
    console.log(`==================================================`);
});
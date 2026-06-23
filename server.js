const express = require('express');
const cors = require('cors');
const path = require('path');
const despesaController = require('./src/controllers/despesaController');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname)));
app.use('/src/ui', express.static(path.join(__dirname, 'src/ui')));

app.use('/api', despesaController);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando com sucesso em http://localhost:${PORT}`);
});
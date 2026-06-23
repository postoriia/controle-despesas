const API_BASE = 'http://localhost:3000/api';

const formCategoria = document.getElementById('formCategoria');
const formTransacao = document.getElementById('formTransacao');
const tabelaCorpo = document.getElementById('tabelaCorpo');
const selectCategoria = document.getElementById('tCategoria');

const cardReceitas = document.getElementById('cardReceitas');
const cardDespesas = document.getElementById('cardDespesas');
const cardSaldo = document.getElementById('cardSaldo');

const formatarMoeda = (valor) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

async function init() {
    await carregarCategorias();
    await carregarTransacoes();
}

async function carregarCategorias() {
    try {
        const res = await fetch(`${API_BASE}/categorias`);
        const categorias = await res.json();
        
        selectCategoria.innerHTML = '<option value="">Sem Categoria</option>';
        categorias.forEach(cat => {
            selectCategoria.innerHTML += `<option value="${cat.id}">${cat.nome}</option>`;
        });
    } catch (e) { console.error(e); }
}

async function carregarTransacoes() {
    try {
        const res = await fetch(`${API_BASE}/transacoes`);
        const transacoes = await res.json();
        
        let totalReceitas = 0;
        let totalDespesas = 0;
        
        tabelaCorpo.innerHTML = '';
        
        transacoes.forEach(t => {
            if (t.tipo === 'Receita') totalReceitas += t.valor;
            else totalDespesas += t.valor;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${t.descricao}</strong></td>
                <td>${t.categoria_nome || 'Sem categoria'}</td>
                <td class="${t.tipo === 'Receita' ? 'txt-receita' : 'txt-despesa'}">${t.tipo}</td>
                <td class="${t.tipo === 'Receita' ? 'txt-receita' : 'txt-despesa'}">
                    ${t.tipo === 'Receita' ? '' : '- '}${formatarMoeda(t.valor)}
                </td>
                <td style="text-align: center;">
                    <button class="btn btn-danger" onclick="deletarTransacao(${t.id})">Remover</button>
                </td>
            `;
            tabelaCorpo.appendChild(tr);
        });

        const saldo = totalReceitas - totalDespesas;
        cardReceitas.innerText = formatarMoeda(totalReceitas);
        cardDespesas.innerText = formatarMoeda(totalDespesas);
        cardSaldo.innerText = formatarMoeda(saldo);
    } catch (e) { console.error(e); }
}

formTransacao.addEventListener('submit', async (e) => {
    e.preventDefault();
    const descricao = document.getElementById('tDescricao').value;
    const valor = document.getElementById('tValor').value;
    const tipo = document.getElementById('tTipo').value;
    const categoria_id = selectCategoria.value;

    const res = await fetch(`${API_BASE}/transacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ descricao, valor, tipo, categoria_id })
    });

    if (res.ok) {
        formTransacao.reset();
        carregarTransacoes();
    } else {
        const err = await res.json();
        alert(err.erro);
    }
});

formCategoria.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('catNome').value;

    const res = await fetch(`${API_BASE}/categorias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome })
    });

    if (res.ok) {
        formCategoria.reset();
        await carregarCategorias();
    } else {
        const err = await res.json();
        alert(err.erro);
    }
});

window.deletarTransacao = async (id) => {
    if (confirm('Remover essa transação?')) {
        await fetch(`${API_BASE}/transacoes/${id}`, { method: 'DELETE' });
        carregarTransacoes();
    }
};

init();
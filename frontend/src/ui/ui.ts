import { state } from '../state/state.js';
import { FinanceService } from '../services/financeService.js';
import { Transacao } from '../types/Transacao.js';

export const UI = {
    // Renderiza o select de categorias no formulário de transações
    renderizarCategorias(): void {
        const selectCategoria = document.getElementById('transacao-categoria') as HTMLSelectElement;
        if (!selectCategoria) return;

        // Mantém a opção padrão limpa
        selectCategoria.innerHTML = '<option value="">Sem Categoria</option>';

        // Adiciona as categorias dinamicamente
        state.categorias.forEach(cat => {
            const option = document.createElement('option');
            option.value = String(cat.id);
            option.textContent = cat.nome;
            selectCategoria.appendChild(option);
        });
    },

    // Calcula os totais de Receitas, Despesas e Saldo e injeta nos cards do Bootstrap
    atualizarDashboard(): void {
        let receitas = 0;
        let despesas = 0;

        state.transacoes.forEach(t => {
            if (t.tipo === 'Receita') receitas += t.valor;
            else despesas += t.valor;
        });

        const saldo = receitas - despesas;

        // Formata os números para Real Brasileiro (R$)
        const formatarMoeda = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const txtReceitas = document.getElementById('total-receitas');
        const txtDespesas = document.getElementById('total-despesas');
        const txtSaldo = document.getElementById('saldo-total');

        if (txtReceitas) txtReceitas.textContent = formatarMoeda(receitas);
        if (txtDespesas) txtDespesas.textContent = formatarMoeda(despesas);
        
        if (txtSaldo) {
            txtSaldo.textContent = formatarMoeda(saldo);
            // Muda a cor do texto do saldo se estiver negativo ou positivo
            txtSaldo.className = `card-text fw-bold ${saldo >= 0 ? 'text-primary' : 'text-danger'}`;
        }
    },

    // Renderiza a tabela com o histórico de transações
    renderizarTransacoes(): void {
        const tabelaBody = document.getElementById('tabela-transacoes');
        if (!tabelaBody) return;

        tabelaBody.innerHTML = '';

        if (state.transacoes.length === 0) {
            tabelaBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">Nenhuma transação cadastrada.</td></tr>`;
            return;
        }

        state.transacoes.forEach(t => {
            const tr = document.createElement('tr');

            // Define obadge de cor para Receita (Verde) ou Despesa (Vermelho)
            const badgeTipo = t.tipo === 'Receita' 
                ? '<span class="badge bg-success">Receita</span>' 
                : '<span class="badge bg-danger">Despesa</span>';

            const valorFormatado = t.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            tr.innerHTML = `
                <td class="fw-bold">${t.descricao}</td>
                <td><span class="text-secondary">${t.categoria_nome || 'Sem categoria'}</span></td>
                <td>${badgeTipo}</td>
                <td class="${t.tipo === 'Receita' ? 'text-success fw-bold' : 'text-danger fw-bold'}">${valorFormatado}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-outline-warning me-1 btn-editar" data-id="${t.id}"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-outline-danger btn-excluir" data-id="${t.id}"><i class="bi bi-trash"></i></button>
                </td>
            `;

            tabelaBody.appendChild(tr);
        });

        // Configura os ouvintes de clique nos botões de Editar e Excluir recém-criados
        this.configurarBotoesAcao();
    },

    // Atribui as ações de clique para os botões dentro da tabela
    configurarBotoesAcao(): void {
        // Cliques em Editar
        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = Number((e.currentTarget as HTMLButtonElement).getAttribute('data-id'));
                const transacao = state.transacoes.find(t => t.id === id);
                if (transacao) this.ativarModoEdicao(transacao);
            });
        });

        // Cliques em Excluir
        document.querySelectorAll('.btn-excluir').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                if (confirm('Tem certeza que deseja excluir esta transação?')) {
                    const id = Number((e.currentTarget as HTMLButtonElement).getAttribute('data-id'));
                    await FinanceService.removerTransacao(id);
                    this.atualizarTela();
                }
            });
        });
    },

    ativarModoEdicao(transacao: Transacao): void {
        state.transacaoEmEdicao = transacao;

        // Muda textos da interface para o modo edição
        (document.getElementById('form-transacao-titulo')!).textContent = 'Editar Transação';
        (document.getElementById('btn-salvar-transacao')!).textContent = 'Atualizar';
        (document.getElementById('btn-cancelar-edicao')!).classList.remove('d-none');

        // Preenche os campos do formulário
        (document.getElementById('transacao-id') as HTMLInputElement).value = String(transacao.id);
        (document.getElementById('transacao-descricao') as HTMLInputElement).value = transacao.descricao;
        (document.getElementById('transacao-valor') as HTMLInputElement).value = String(transacao.valor);
        (document.getElementById('transacao-tipo') as HTMLSelectElement).value = transacao.tipo;
        (document.getElementById('transacao-categoria') as HTMLSelectElement).value = transacao.categoria_id ? String(transacao.categoria_id) : '';
    },

    desativarModoEdicao(): void {
        state.transacaoEmEdicao = null;

        (document.getElementById('form-transacao-titulo')!).textContent = 'Nova Transação';
        (document.getElementById('btn-salvar-transacao')!).textContent = 'Salvar Transação';
        (document.getElementById('btn-cancelar-edicao')!).classList.add('d-none');

        (document.getElementById('form-transacao') as HTMLFormElement).reset();
        (document.getElementById('transacao-id') as HTMLInputElement).value = '';
    },

    // Executa as três atualizações visuais juntas
    atualizarTela(): void {
        this.renderizarCategorias();
        this.atualizarDashboard();
        this.renderizarTransacoes();
    }
};
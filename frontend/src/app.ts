import { FinanceService } from './services/financeService.js';
import { UI } from './ui/ui.js';// O compilador vai resolver para ui.js no final

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Carrega os dados iniciais do banco através da API
    await FinanceService.carregarDados();
    
    // 2. Renderiza os dados iniciais na tela
    UI.atualizarTela();

    // 3. Ouvinte do Formulário de adicionar Categoria
    const formCategoria = document.getElementById('form-categoria') as HTMLFormElement;
    formCategoria?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputNome = document.getElementById('categoria-nome') as HTMLInputElement;
        const nome = inputNome.value.trim();

        if (nome) {
            try {
                await FinanceService.adicionarCategoria(nome);
                UI.atualizarTela();
                formCategoria.reset();
            } catch (err) {
                alert('Erro ao salvar categoria. Certifique-se de que o nome não é duplicado.');
            }
        }
    });

    // 4. Ouvinte do Formulário de salvar Transação (Criar ou Editar)
    const formTransacao = document.getElementById('form-transacao') as HTMLFormElement;
    formTransacao?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const descricao = (document.getElementById('transacao-descricao') as HTMLInputElement).value.trim();
        const valor = Number((document.getElementById('transacao-valor') as HTMLInputElement).value);
        const tipo = (document.getElementById('transacao-tipo') as HTMLSelectElement).value as 'Receita' | 'Despesa';
        const categoriaIdRaw = (document.getElementById('transacao-categoria') as HTMLSelectElement).value;
        const categoriaId = categoriaIdRaw ? Number(categoriaIdRaw) : null;

        await FinanceService.salvarTransacao(descricao, valor, tipo, categoriaId);
        
        // Atualiza a visualização e limpa o formulário
        UI.atualizarTela();
        UI.desativarModoEdicao();
    });

    // 5. Botão de cancelar edição
    const btnCancelar = document.getElementById('btn-cancelar-edicao');
    btnCancelar?.addEventListener('click', () => {
        UI.desativarModoEdicao();
    });
});
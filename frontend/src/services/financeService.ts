import { CategoriaAPI, TransacaoAPI } from '../api/api.js';
import { state } from '../state/state.js';
import { Categoria } from '../types/Categoria.js';
import { Transacao } from '../types/Transacao.js';

export const FinanceService = {
    async carregarDados(): Promise<void> {
        // Busca categorias e transações do backend em paralelo
        const [categorias, transacoes] = await Promise.all([
            CategoriaAPI.listar(),
            TransacaoAPI.listar()
        ]);
        
        // Atualiza o estado local
        state.categorias = categorias;
        state.transacoes = transacoes;
    },

    async removerTransacao(id: number): Promise<void> {
    await TransacaoAPI.excluir(id);
    state.transacoes = state.transacoes.filter(t => t.id !== id);
    },
    async adicionarCategoria(nome: string): Promise<void> {
        const novaCategoria = await CategoriaAPI.criar({ nome });
        state.categorias.push(novaCategoria);
    },

    async salvarTransacao(descricao: string, valor: number, tipo: 'Receita' | 'Despesa', categoriaId: number | null): Promise<void> {
        const dadosTransacao: Transacao = { descricao, valor, tipo, categoria_id: categoriaId };

        if (state.transacaoEmEdicao && state.transacaoEmEdicao.id) {
            // Se tem alguém em edição, atualiza
            const atualizada = await TransacaoAPI.atualizar(state.transacaoEmEdicao.id, dadosTransacao);
            
            // Substitui a transação antiga no estado pela atualizada
            const index = state.transacoes.findIndex(t => t.id === state.transacaoEmEdicao!.id);
            if (index !== -1) {
                state.transacoes[index] = atualizada;
            }
            state.transacaoEmEdicao = null; // Limpa o modo edição
        } else {
            // Caso contrário, cria uma nova
            const novaTransacao = await TransacaoAPI.criar(dadosTransacao);
            state.transacoes.unshift(novaTransacao); // Adiciona no início da lista
        }
    },
    
};
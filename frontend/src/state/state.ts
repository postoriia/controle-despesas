import { Categoria, Transacao } from '../api/types.js';

interface AppState {
    categorias: Categoria[];
    transacoes: Transacao[];
    transacaoEmEdicao: Transacao | null;
}

// Objeto global que guarda o estado da aplicação na memória
export const state: AppState = {
    categorias: [],
    transacoes: [],
    transacaoEmEdicao: null
};
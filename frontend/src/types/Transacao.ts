export interface Transacao {
    id?: number;
    descricao: string;
    valor: number;
    tipo: 'Receita' | 'Despesa';
    categoria_id: number | null;
    categoria_nome?: string;
}
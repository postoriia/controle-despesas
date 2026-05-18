# projeto1

Ideia do Projeto

Um sistema fullstack para gerenciar finanças pessoais, permitindo que o usuário registre receitas e despesas, categorize gastos, visualize saldo e acompanhe seu histórico financeiro ao longo do tempo.

Funcionalidades principais:

Cadastro de receitas e despesas
Classificação por categorias
Controle de saldo
Histórico de transações

Classes do Domínio

1. Usuario

Representa quem usa o sistema.

Atributos:

id
nome
email
senha

Responsabilidade:

Gerenciar seus próprios dados
Ser dono das transações

2. Transacao

Classe base para movimentações financeiras.

Atributos:

id
descricao
valor
data
tipo (receita ou despesa)

Responsabilidade:

Representar qualquer movimentação financeira

3. Categoria

Classifica as transações.

Atributos:

id
nome (ex: alimentação, transporte, salário)

Responsabilidade:

Organizar e agrupar transações

4. Conta

Representa onde o dinheiro está (tipo carteira, banco, etc.)

Atributos:

id
nome (ex: Nubank, Carteira, Caixa)
saldo

Responsabilidade:

Armazenar saldo atual
Relacionar com transações

5. ResumoFinanceiro (Relatorio)

Responsável por gerar visão geral.

Atributos:

totalReceitas
totalDespesas
saldoFinal

Responsabilidade:

Calcular e exibir dados consolidados

- Relações entre as Classes

Usuario 1:N Transacao
→ Um usuário pode ter várias transações
Transacao N:1 Categoria
→ Cada transação pertence a uma categoria
Conta 1:N Transacao
→ Uma conta possui várias transações
ResumoFinanceiro depende de Transacao
→ Ele não armazena dados próprios, apenas calcula com base nas transações (agregação)

# **CSI606-2025-02 - Remoto - Proposta de Trabalho Final**

## *Discente: Vitor Gomes Ferreira (23.1.8010)*

### Resumo

  O trabalho consiste no desenvolvimento de um sistema web centralizado para o gerenciamento e agendamento de salas de reuniões do ICEA. O sistema visa substituir processos manuais ou descentralizados, otimizando a ocupação dos espaços e fornecendo transparência sobre a disponibilidade em tempo real. O público-alvo abrange alunos, professores, funcionários (usuários comuns) e a administração do instituto, permitindo reservas autônomas com validação automática de conflitos.

### 1. Tema

  O trabalho final tem como tema o desenvolvimento de um **Sistema de Reserva da Sala de Reuniões do ICEA**.

### 2. Escopo

  Este projeto terá as seguintes funcionalidades, divididas por perfis de acesso:

  **Geral (Todos os Usuários):**
  * **Autenticação:** Login e logout seguros.
  * **Visualização de Disponibilidade:** Grade de calendário (diário, semanal ou mensal) exibindo horários livres e ocupados.
  * **Validação de Conflitos:** O sistema impedirá automaticamente reservas duplicadas para o mesmo local e horário.

  **Módulo de Usuário Comum (Aluno, Professor, Funcionário):**
  * **Dashboard:** Visualização resumida das próximas reservas do próprio usuário.
  * **Listagem de Salas:** Consulta de salas com detalhes (capacidade, localização, recursos como projetor/quadro).
  * **Reserva:** Formulário para solicitar reserva (título, descrição, horário).
  * **Minhas Reservas:** Funcionalidade para o usuário editar ou cancelar as reservas que ele mesmo criou.

  **Módulo de Administrador:**
  * **Gestão de Salas (CRUD):** Cadastro, edição e remoção de salas e seus recursos.
  * **Gestão Global de Reservas:** Visualização de todas as reservas do sistema, com permissão para editar ou cancelar qualquer agendamento (para resolução de conflitos ou prioridades institucionais).

### 3. Restrições

  Neste trabalho **não** serão considerados:
  * Integração com sistemas de calendário externos (como Google Agenda ou Outlook).
  * Sistemas de faturamento ou cobrança financeira pelo uso do espaço.
  * Fluxos complexos de aprovação hierárquica (ex: necessidade de validação de um chefe de departamento antes da confirmação).

### 4. Protótipo

  O fluxo da aplicação foi planejado com as seguintes telas principais:

  1.  **Tela de Login:** Página simples para autenticação do usuário no sistema.
  2.  **Dashboard (Página Inicial):** Exibe "Minhas Próximas Reservas" em destaque e atalhos rápidos para "Nova Reserva".
  3.  **Tela de Busca/Calendário:** Uma interface de calendário onde o usuário visualiza a grade de horários. Ao clicar em um horário vago, é redirecionado para o formulário de reserva.
  4.  **Detalhes da Sala:** Página ou modal exibindo foto da sala, lista de recursos e capacidade máxima.
  5.  **Formulário de Reserva:** Campos para inserir o título da reunião, descrição e confirmar o intervalo de tempo selecionado.
  6.  **Painel Administrativo:** Tabelas para listagem e botões de ação (Editar/Excluir) para o gerenciamento das Salas e a moderação das Reservas globais.

### 5. Referências

  Nenhuma referência específica utilizada até o momento.
  
# ICEA Reservas - Sistema de Gestão de Salas

Sistema completo para reserva de salas e espaços físicos do Campus ICEA (UFOP), desenvolvido com foco em usabilidade e segurança.

## 🚀 Arquitetura do Sistema

A solução segue uma arquitetura moderna e desacoplada:

1.  **Frontend (React + Tailwind CSS):**
    *   Interface reativa e SPA (Single Page Application).
    *   Gerenciamento de rotas com `react-router-dom`.
    *   Estilização profissional baseada na paleta institucional (Azul Marinho e Cinza).
    *   Componente `react-big-calendar` para visualização temporal das reservas.

2.  **Comunicação (Axios):**
    *   Cliente HTTP configurado em `services/api.js`.
    *   Tratamento de interceptação e Base URL centralizada para a API Laravel.

3.  **Backend (Laravel API):**
    *   Rotas do tipo `apiResource` para `/reservas` e `/salas`.
    *   **Trava Matemática:** Lógica no `ReservationController` que impede sobreposição de horários no banco de dados (Status 409 Conflict).
    *   Validações de integridade e relacionamentos entre Usuários, Salas e Reservas.

4.  **Persistência (SQLite):**
    *   Banco de dados leve e eficiente, ideal para o ambiente de desenvolvimento e produção em pequena escala.
    *   Migrations estruturadas para garantir a consistência dos tipos de dados.

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React 19, Tailwind CSS, Lucide Icons (emojis), Moment.js.
- **Backend:** Laravel 11+, PHP 8.2+.
- **Database:** SQLite.

## 🔒 Controle de Acesso e Regras
- **Admin:** Acesso total (CRUD de Salas e Reservas de qualquer usuário).
- **Comum:** Pode criar reservas e gerenciar apenas os seus próprios agendamentos.
- **Validação:** Verificação de horários impeditivos no frontend e backend.

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

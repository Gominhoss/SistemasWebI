# Documentação Final: Sistema de Reservas de Salas do ICEA

**Desenvolvedor:** Vitor Gomes Ferreira   
**Instituição:** Universidade Federal de Ouro Preto (UFOP)  
**Disciplina:** Sistemas WEB I  

## Escopo e Domínio do Projeto
O ambiente acadêmico do ICEA exige uma organização rigorosa para a utilização de espaços físicos compartilhados. O domínio deste projeto ataca diretamente o problema de sobreposição de agendamentos, fornecendo um sistema web centralizado para a reserva de salas de reunião. O escopo contempla a autenticação segura de usuários administradores, o cadastro de espaços físicos e uma grade visual interativa para o controle de disponibilidade, garantindo a integridade dos dados através de validações matemáticas de tempo.

## Arquitetura e Tecnologias Utilizadas
A aplicação foi desenvolvida sob a ótica de sistemas modernos, adotando o modelo arquitetural *API-First* (desacoplamento total entre cliente e servidor).

- **Backend (API RESTful):** Construído com o framework PHP Laravel. A lógica de negócio está estritamente separada em Controladores e Modelos (padrão MVC), fornecendo pacotes JSON para o cliente. O banco de dados escolhido foi o SQLite, garantindo portabilidade.
- **Frontend (Single Page Application):** Estruturado com React e Vite. A comunicação assíncrona é feita via Axios.
- **Estilização e UX:** A interface adota o framework utilitário Tailwind CSS para um design responsivo e acessível, em conjunto com a biblioteca React Big Calendar para a manipulação intuitiva dos blocos de horário.

## Funcionalidades Implementadas
O sistema entrega um ciclo completo de operações estruturais e regras de negócio:

- Autenticação e proteção de rotas com tokens via Laravel Sanctum.
- Gestão de infraestrutura (CRUD completo para registro, edição, exclusão e visualização de salas).
- Sistema interativo de agendamentos via calendário.
- Trava de segurança no *backend* que intercepta e bloqueia automaticamente a criação ou atualização de reuniões em horários sobrepostos (retornando status HTTP 409 Conflict).

## Atendimento aos Critérios de Avaliação

**Avaliação do Backend (40 pontos):**
- **Definição do Escopo (10 pts):** O problema de agendamentos do ICEA foi resolvido focando na integridade da agenda e controle de acesso.
- **Funcionalidades (15 pts):** Todos os requisitos vitais (CRUD, validações, cálculos de horário e autenticação) operam sem falhas no motor da API.
- **Framework e MVC (15 pts):** Uso correto de *Migrations* para estrutura do banco, *Seeders* para injeção do usuário administrador, rotas isoladas em `api.php` e *Controllers* RESTful padronizados (index, store, show, update, destroy).

**Avaliação do Frontend (40 pontos):**
- **Interfaces e Funcionalidades (15 pts):** A tela foi dividida estrategicamente para reduzir a carga cognitiva, exibindo o formulário de reserva e o resultado no calendário simultaneamente, com feedback claro de erros (Toasts/Alertas) para o usuário.
- **Utilização das Tecnologias (25 pts):** Adoção das melhores práticas do React, gerenciando estados mutáveis (`useState`), efeitos colaterais de rede (`useEffect`), proteção de rotas client-side (`react-router-dom`) e manipulação correta de CORS na ponte com o Laravel.

## Instruções para Execução

**Iniciando o Servidor de Dados (Backend):**
- Acesse o diretório `backend`.
- Execute a construção do banco com injeção de dados: `php artisan migrate:fresh --seed`
- Levante a API: `php artisan serve` (Rodará em localhost:8000)

**Iniciando a Interface (Frontend):**
- Abra um novo terminal e acesse o diretório `frontend`.
- Instale os pacotes: `npm install`
- Inicie o client: `npm run dev` (Rodará em localhost:5173)

**Credenciais de Acesso (Administrador):**
- E-mail: `admin@icea.br`
- Senha: `senha123`

## Link da Apresentação
[INSERIR AQUI O LINK DO YOUTUBE/DRIVE DO SEU VÍDEO]
# 🚀 InventoryPro: Sistema de Gestão de Estoque Full Stack

Um sistema completo de gerenciamento de estoque e inventário construído com uma arquitetura moderna e escalável.

---

## 🌟 Visão Geral e Funcionalidades

O InventoryPro é uma aplicação full stack desenvolvida para permitir que empresas monitorem, gerenciem e controlem seus níveis de estoque em tempo real.

### Principais Recursos

* **Dashboard Interativa:** Visão geral rápida de KPIs (valor total de estoque, produtos com estoque baixo, etc.) e gráficos de estoque.
* **Autenticação Completa:** Cadastro, Login e persistência de sessão (JWT).
* **Controle de Acesso (RBAC):** Diferenciação de permissões para usuários `ADMIN` (acesso total) e `EMPLOYEE` (visualização e consulta).
* **CRUD de Produtos:** Gestão completa de inventário (criação, leitura, atualização e exclusão de produtos).

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Backend** | **NestJS** | Framework Node.js para aplicações robustas e escaláveis. |
| **Banco de Dados** | **PostgreSQL** | Utilizado como o banco de dados principal. |
| **ORM** | **TypeORM** | Mapeador Objeto-Relacional utilizado para gerenciar entidades e migrações. |
| **Frontend** | **ReactJS** | Biblioteca para construção da interface de usuário. |
| **Estilização** | **Tailwind CSS** | Framework CSS utility-first para design rápido e responsivo. |
| **Animação** | **Framer Motion** | Utilizado na Sidebar para animações suaves. |
| **Infraestrutura** | **Docker & Docker Compose** | Conteinerização de todos os serviços (Backend, Frontend e DB). |
| **Linguagem** | **TypeScript** | Utilizado em todo o projeto (Backend e Frontend). |

---

## ⚙️ Como Executar o Projeto

Este projeto é executado utilizando `docker-compose`, o que simplifica a configuração do ambiente.

### Pré-requisitos

* [Docker](https://www.docker.com/get-started) instalado e em execução.
* [Node.js](https://nodejs.org/) (Opcional, mas recomendado para comandos locais).

### Passos de Inicialização

1.  **Clone o repositório:**
    ```bash
    git clone [LINK DO SEU REPOSITÓRIO]
    cd [NOME DO REPOSITÓRIO]
    ```

2.  **Configurar Variáveis de Ambiente:**
    Crie o arquivo `.env` na raiz do projeto com as suas configurações (ex: chave JWT, credenciais do DB).

3.  **Executar o Docker Compose:**
    Este comando irá construir as imagens, levantar os containers e iniciar o servidor.
    ```bash
    docker-compose up --build
    ```

4.  **Executar Migrações do TypeORM (Obrigatório):**
    Após os containers estarem rodando, se você usa o sistema de migrações do TypeORM, execute o comando (adapte `[NOME_DO_CONTAINER_BACKEND]`):
    ```bash
    docker exec -it [NOME_DO_CONTAINER_BACKEND] npm run typeorm migration:run
    ```
    *(Se você usa `synchronize: true` no TypeORM, este passo pode não ser necessário, mas não é recomendado para produção.)*

### Acesso

| Serviço | URL de Acesso |
| :--- | :--- |
| **Frontend** | `http://localhost:3001` |
| **Backend** | `http://localhost:3000/api` |

**O primeiro usuário registrado automaticamente receberá a role `ADMIN`.**

---

## 🤝 Contribuições

Sinta-se à vontade para abrir Issues ou Pull Requests. Toda contribuição é bem-vinda!

---

## 👨‍💻 Autor

[Seu Nome Completo]

[Seu Perfil do LinkedIn]

[Seu Portfólio ou Website (Opcional)]

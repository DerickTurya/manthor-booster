# 🔥 ManThor - Sistema Completo com Autenticação

Sistema completo de gerenciamento ManThor com autenticação JWT, banco de dados SQLite e API REST.

## 🚀 Instalação e Execução

### 1. Instalar Dependências

```powershell
npm install
```

### 2. Iniciar o Servidor

```powershell
npm start
```

O servidor será iniciado em: **http://localhost:3000**

## 📁 Estrutura do Projeto

```
├── server.js           # Servidor Express + API REST
├── login.html          # Página de login/cadastro
├── index.html          # Aplicação principal (protegida)
├── manthor.db          # Banco de dados SQLite (criado automaticamente)
├── package.json        # Dependências do projeto
└── README.md          # Este arquivo
```

## 🔐 Funcionalidades de Autenticação

### Cadastro de Usuário
- Nome completo
- Email único
- Senha (mínimo 6 caracteres, criptografada com bcrypt)
- Token JWT gerado automaticamente

### Login
- Email e senha
- Validação de credenciais
- Token JWT com validade de 7 dias
- Redirecionamento automático para aplicação

### Proteção de Rotas
- Token JWT obrigatório
- Middleware de autenticação
- Logout com limpeza de token

## 💾 Banco de Dados

O sistema usa **SQLite** com as seguintes tabelas:

### `users`
- id (PRIMARY KEY)
- name
- email (UNIQUE)
- password (hash bcrypt)
- created_at

### `user_data`
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- age
- weight
- height
- goal
- routine_history (JSON)
- last_updated

### `reminders`
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- time
- frequency
- active
- created_at

## 🛠️ API Endpoints

### Públicos
- `POST /api/register` - Cadastrar usuário
- `POST /api/login` - Fazer login

### Protegidos (requerem token)
- `GET /api/user` - Obter dados do usuário
- `PUT /api/user/data` - Atualizar dados (idade, peso, altura, objetivo)
- `POST /api/user/routine` - Salvar rotina calculada
- `GET /api/reminders` - Listar lembretes
- `POST /api/reminders` - Criar lembrete
- `DELETE /api/reminders/:id` - Deletar lembrete

## 🔧 Tecnologias Utilizadas

- **Backend**: Node.js + Express
- **Autenticação**: JWT (JSON Web Tokens)
- **Criptografia**: bcryptjs
- **Banco de Dados**: SQLite3
- **Frontend**: HTML5 + CSS3 + JavaScript Vanilla

## 📝 Como Usar

1. **Acesse** http://localhost:3000
2. **Cadastre-se** com nome, email e senha
3. Faça **login** automaticamente
4. Use a **calculadora** para gerar rotinas personalizadas
5. Seus dados são **salvos automaticamente** no banco

## 🔒 Segurança

- ✅ Senhas criptografadas com bcrypt (salt rounds: 10)
- ✅ Tokens JWT com expiração de 7 dias
- ✅ Validação de email único
- ✅ Middleware de autenticação em todas as rotas protegidas
- ✅ Proteção contra injeção SQL (prepared statements)

## 🎨 Efeitos Visuais

- Raios elétricos azuis animados
- Runas vikings flutuantes vermelhas
- Glows pulsantes no fundo
- Animações suaves em todos os elementos

## 🌐 Acesso

- **Login/Cadastro**: http://localhost:3000
- **Aplicação**: http://localhost:3000/app (requer autenticação)

## 📦 Dependências

```json
{
  "express": "^4.18.2",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "sqlite3": "^5.1.6",
  "cors": "^2.8.5"
}
```

## 🪓 Viking Power Activated!

Sistema pronto para uso em produção! 🔥

# Biblioteca Virtual - Frontend


## ⚠️ Importante

> Esta aplicação **deve ser utilizada em conjunto com a API** [Biblioteca Virtual - Backend](https://github.com/GabrielBottoni/biblioteca-virtual).  
> Certifique-se de que a API está rodando localmente ou em um ambiente acessível antes de iniciar o frontend.

--- 

## Descrição

Este é o frontend da aplicação Biblioteca Virtual, uma plataforma onde usuários podem se cadastrar, fazer login, navegar e alugar livros, enquanto administradores possuem painel para gerenciar livros e usuários.

A interface é construída em React e se comunica com a API backend para autenticação, gerenciamento e listagem de dados.

---

## Tecnologias Utilizadas

- React Vite
- React Router DOM (v7)
- Axios (para chamadas HTTP)
- Bootstrap 5 + React-Bootstrap e Reactstrap (componentes UI)
- React Icons (ícones)
- React Toastify (notificações)
- jwt-decode (para decodificar tokens JWT)

---

## Funcionalidades Principais

- ✅ Cadastro e login de usuários com autenticação via JWT
- 📚 Visualização da lista de livros disponíveis
- 🔐 Rotas protegidas para usuários autenticados
- 🛠 Painel administrativo com:
  - Cadastro, edição e exclusão de livros com imagens de capa
  - Gerenciamento de usuários e permissões administrativas
- 🚨 Feedback visual via Toasts para ações e erros

---

## Como Rodar Localmente

1. Clone o repositório:

  git clone https://github.com/seu-usuario/seu-frontend-repositorio.git

2. Instale as dependências:

  npm install

3. Inicie o servidor de desenvolvimento:

  npm run dev

## Sobre a Autenticação

-O frontend utiliza JWT para autenticação, armazenando o token no localStorage ou sessionStorage.
-O token é enviado automaticamente em cabeçalhos das requisições via Axios.
-Usuários sem token válido são redirecionados para a página de login.
-O pacote jwt-decode é usado para extrair informações do token para controle de acesso no frontend.



## 🌐 Link de Produção

Ainda não está disponível online.

## 👨‍💻 Autor

Gabriel Bottoni
LinkedIn: https://www.linkedin.com/in/gabrielbottoni/

## 📄 Licença

Este projeto está licenciado sob a MIT License.

## 🤝 Contribuições

Contribuições são bem-vindas!
Sinta-se à vontade para abrir uma issue ou pull request.


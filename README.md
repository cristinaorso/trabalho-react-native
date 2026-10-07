# Trabalho de React Native – Consumo de API

Aplicativo desenvolvido em React Native com Expo para consumo de uma API de produtos.

O aplicativo possui autenticação de usuário, listagem de produtos, filtro por categoria, visualização dos detalhes dos produtos e informações dos integrantes do grupo.

---

## Integrantes

- **Cristina Bisol Orso**  
  RA: 1139000

- **Rafaela Laimer Davesc**  
  RA: 1138820

---

## Tecnologias utilizadas

- React Native
- Expo
- JavaScript
- Axios
- React Navigation
- DummyJSON API

---

## Funcionalidades

### Login

O aplicativo possui uma tela de login com os campos:

- Usuário
- Senha

Antes de realizar a autenticação, o aplicativo verifica os usuários disponíveis na API.

Após a validação das credenciais, o usuário é direcionado para a tela de produtos.

Caso as credenciais sejam inválidas, é apresentada uma mensagem de erro.

Também existe tratamento para falha de conexão com a API.

---

### Listagem de produtos

A tela principal apresenta os produtos disponíveis na API utilizando `FlatList`.

Cada produto apresenta:

- Imagem
- Nome
- Categoria
- Preço em reais

Os preços são formatados no padrão brasileiro, por exemplo:

**R$ 199,90**

Durante o carregamento dos produtos, o aplicativo apresenta um `ActivityIndicator`.

---

### Filtro por categoria

A tela de produtos possui um filtro por categoria.

Inicialmente, todos os produtos são apresentados.

O usuário pode selecionar uma categoria para visualizar somente os produtos pertencentes àquela categoria.

Também é possível selecionar a opção **Todos** para remover o filtro e voltar a visualizar todos os produtos.

---

### Detalhes do produto

Ao selecionar um produto, o aplicativo abre uma tela de detalhes.

São apresentados:

- Imagem do produto
- Nome
- Categoria
- Preço
- Descrição
- Avaliação
- Estoque

Durante o carregamento das informações, o aplicativo apresenta um `ActivityIndicator`.

---

### Informações do grupo

O aplicativo possui uma tela com as informações do grupo.

Nela são apresentados os nomes e RAs dos integrantes, além das tecnologias utilizadas no desenvolvimento.

---

## API utilizada

O projeto utiliza a **DummyJSON API** para o consumo dos dados.

A API está disponível em:

https://dummyjson.com

O projeto utiliza endpoints para:

- Consulta de usuários
- Autenticação
- Consulta de produtos
- Consulta de categorias
- Consulta de detalhes de produtos

---

## Como verificar os usuários disponíveis

Para verificar os usuários disponíveis para autenticação, pode ser utilizado o endpoint:

```text
https://dummyjson.com/users

Os dados retornados pela API apresentam informações dos usuários, incluindo:
- username
- password

Para realizar o login no aplicativo, deve ser utilizado um usuário existente na API.

Usuário utilizado para teste
Usuário:
emilys

Senha:
emilyspass

Como executar o projeto:

1. Instalar o Node.js
É necessário ter o Node.js instalado no computador.
A versão utilizada durante o desenvolvimento foi a versão 21.7.3.

2. Instalar as dependências
Abra o terminal na pasta do projeto:
trabalho-react-native-final

Execute:
npm install

3. Iniciar o projeto
Para iniciar o projeto utilizando o Expo:
npx expo start

Também é possível executar diretamente no navegador:
npx expo start --web

Como utilizar o aplicativo

### 1. Login
Na tela inicial, informe um usuário existente na API e sua respectiva senha.

Exemplo:
Usuário: emilys
Senha: emilyspass

Depois clique em:
ENTRAR

### 2. Produtos
Após o login, será apresentada a lista de produtos.
O usuário pode:
- Visualizar os produtos;
- Filtrar por categoria;
- Selecionar um produto;
- Acessar os detalhes;
- Acessar as informações do grupo;
- Sair da conta.

3. Detalhes
Ao clicar em um produto, será aberta a tela de detalhes com as informações completas do produto.

4. Informações do grupo
O botão Info, localizado no cabeçalho da tela de produtos, direciona para a tela:
Informações do Grupo

5. Logout
O botão Sair, localizado no cabeçalho da tela de produtos, retorna o usuário para a tela de login.

Estrutura do projeto
O projeto foi organizado em diferentes pastas para facilitar a manutenção e separação das responsabilidades.

trabalho-react-native-final/
│
├── assets/
│
├── constants/
│   └── colors.js
│
├── screens/
│   ├── LoginScreen.js
│   ├── ProductsScreen.js
│   ├── DetailsScreen.js
│   └── InfoScreen.js
│
├── services/
│   └── api.js
│
├── utils/
│   └── formatPrice.js
│
├── App.js
├── app.json
├── package.json
└── README.md

Organização das responsabilidades

App.js
Responsável pela configuração da navegação do aplicativo utilizando React Navigation.

screens/
Contém as telas principais do aplicativo:
- LoginScreen.js — tela de autenticação;
- ProductsScreen.js — listagem e filtro de produtos;
- DetailsScreen.js — detalhes do produto;
- InfoScreen.js — informações do grupo.

services/
Contém a configuração do Axios para comunicação com a API.

utils/
Contém funções auxiliares utilizadas pelo aplicativo.
O arquivo formatPrice.js é responsável pela formatação dos valores para reais.

constants/
Contém constantes utilizadas no projeto, como as cores da interface.

Navegação
A navegação do aplicativo foi desenvolvida utilizando React Navigation com Stack Navigation.

O fluxo principal é:

Login
  ↓
Produtos
  ├── Detalhes do Produto
  └── Informações do Grupo

Na tela de produtos existem também as opções:
Sair → Login

Info → Informações do Grupo

Tratamento de carregamento e erros
O aplicativo utiliza ActivityIndicator durante o carregamento das informações da API.

Também são apresentadas mensagens de erro para situações como:
- Login inválido;
- Falha de rede;
- Falha ao carregar produtos;
- Falha ao carregar detalhes do produto.

Hooks utilizados
O projeto utiliza os principais Hooks do React necessários para o funcionamento das telas:
useState
Utilizado para controlar estados como:
- usuário;
- senha;
- produtos;
- categorias;
- categoria selecionada;
- carregamento;
- mensagens de erro.

useEffect
Utilizado para executar chamadas à API quando as telas são carregadas ou quando o filtro de categoria é alterado.

Consumo da API
O consumo da API é realizado utilizando a biblioteca Axios.

A configuração centralizada da API está localizada em:
services/api.js

O Axios é utilizado para realizar requisições HTTP para obtenção dos usuários, autenticação, produtos, categorias e detalhes dos produtos.

Observação sobre a API
O enunciado do trabalho apresenta a utilização da Fake Store API e também informa que a DummyJSON poderia ser utilizada caso a Fake Store API não estivesse funcionando durante o desenvolvimento.

Neste projeto foi utilizada a DummyJSON API, conforme essa possibilidade apresentada no enunciado.

Objetivo do projeto
O objetivo do projeto é demonstrar a utilização de React Native com Expo para desenvolvimento de uma aplicação mobile capaz de consumir uma API externa, realizar autenticação, apresentar dados dinamicamente e permitir a navegação entre diferentes telas.


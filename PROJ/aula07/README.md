
# Sistema de Gestão de Turmas e Atividades

Este projeto é um sistema de gestão de turmas e atividades para professores, desenvolvido utilizando Node.js, Prisma, e MySQL. Ele permite criar, editar e visualizar turmas e atividades de maneira eficiente.

## Como Executar Este Projeto

### 1. Clone este repositório

No terminal ou CMD, clone o repositório usando o comando:

```bash
git clone <URL-do-repositório>
```

### 2. Abrir o projeto no Visual Studio Code

- Abra o Visual Studio Code e navegue até o diretório do projeto.

### 3. Instalar as dependências

- No terminal do VSCode, navegue até a pasta `api` (backend) com o seguinte comando:

```bash
cd api
```

- Instale as dependências necessárias para o projeto:

```bash
npm install
```

### 4. Configurar o arquivo `.env`

- Na raiz do diretório `api`, crie um arquivo `.env` com a seguinte variável de ambiente:

```bash
DATABASE_URL="mysql://root:@localhost:3306/turmas"
```

- Verifique se o MySQL está rodando em sua máquina e se há um banco de dados criado com o nome \`turmas\`.

### 5. Executar as migrations

- No terminal, execute o seguinte comando para criar as tabelas no banco de dados:

```bash
npx prisma migrate dev --name init
```

- Isso criará as tabelas e aplicará as migrations de acordo com o schema definido.

### 6. Iniciar o servidor

- Agora, para iniciar o servidor backend, execute o seguinte comando:

```bash
npx nodemon
```

- O servidor ficará disponível por padrão na porta `3000`.

### 7. Rodar o frontend

- Navegue até a pasta `web` do projeto:

```bash
cd ../front
```

- Você pode rodar o arquivo `index.html` diretamente no navegador, utilizando uma extensão como o **Live Server** no Visual Studio Code para testar a interface.

---

## Estrutura do Projeto

### Diretório `api`

Esta pasta contém o código do backend, que lida com a lógica de negócio e interações com o banco de dados.

- **src/controllers**: Contém os controladores de Professores, Turmas e Atividades.
- **routes.js**: Gerencia as rotas da API.
- **server.js**: Configura o servidor e define as rotas principais da aplicação.

### Diretório `front`

Esta pasta contém o código do frontend, que permite a interação do usuário com o sistema.

- **index.html**: Tela inicial.
- **turmas.html**: Tela de gestão de turmas.
- **atividades.html**: Tela de gestão de atividades.
- **style.css**: Arquivo de estilização do frontend.

---

## Requisitos Adicionais

- **Banco de dados**: MySQL rodando localmente ou em uma instância remota com o nome \`turmas\`.
- **Extensão Live Server**: Para rodar o frontend diretamente no navegador com atualizações automáticas.

---





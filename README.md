# Simplificauto Movies 

<div >
    <img src="https://img.shields.io/badge/React-v16.13.1-blue?style=flat"/>
    <img src="https://img.shields.io/badge/Reactstrap-v8.5.1-9cf?style=flat"/>
    <img src="https://img.shields.io/badge/Express-v4.17.1-violet?style=flat"/>
    <img src="https://img.shields.io/badge/Sequelize-v6.3.3-red?style=flat"/>
    <img src="https://img.shields.io/badge/Sqlite-v5.0.0-sucess?style=flat"/>

</div>

> Este repositório contém a solução para o teste da Simplificauto.



### Dependências


O front-end da aplicação utiliza o [React](https://reactjs.org/) juntamente com o framework [Reactstrap](https://reactstrap.github.io/) que contém componentes pré-definidos para utilização com o react.
Já o back-end é basicamente em [Node.js](https://nodejs.org/en/) e utiliza o framework [Express](https://expressjs.com/) para servir como servidor e lidar com o banco de dados, o [Sqlite](https://www.sqlite.org/index.html), utilizado através do ORM [Sequelize](https://sequelize.org/).

### Pré-Requisitos

Para rodar este projeto é necessário que tenha instalado o [Node.js](https://nodejs.org/en/), e utilize algum gerenciador de pacotes, podendo ser o padrão que vem na instalação do Node.js, o [npm](https://www.npmjs.com/), ou caso prefira, o [yarn](https://classic.yarnpkg.com/pt-BR/).

### Etapas Para Utilizar o Projeto

Após baixar ou realizar o clone do respositório, ele virá com a seguinte estrutura:

    -backend/
        -database/
        -src/
        -.sequelizerc
        -package.json
    -frontend/
        -public/
        -src/
        -package.json
    -LICENSE
    -package.json
    -README.md

**1- Inicializar o Back-end**

No terminal estando na raiz do projeto, entre na pasta 'backend':

```
  $ cd backend
```

E lance o comando para instalar as dependência do backend:

```
  $ npm install
```

Após o gerenciador de pacotes realizar o download das dependências, lance o comando para inicializar o back-end:

```
  $ npm run start
```


**2- Inicializar o Front-end**


Com o back-end inicializado, em outro terminal, volte para raiz do projeto e entre na pasta 'frontend':

```
  $ cd frontend
```

E lance o comando para instalar as dependência do frontend:

```
  $ npm install
```


Com as dependências instaladas, execute o comando para inicializar o front-end:

```
  $ npm run start
```

##### Após inicializar o back-end ele estará rodando na porta **3333**, e o front-end irá rodar na porta padrão do React **3000**. A partir dai, é possível acessar a aplicação pelo browser através do endereço `http://localhost:3000/` ou  `http://127.0.0.1:3000/`




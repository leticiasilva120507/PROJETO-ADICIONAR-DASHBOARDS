// Importa o framework Express
const express = require('express');
const app = express();

// Carrega variáveis de ambiente do .env
const env = require("dotenv").config();
// Importa o middleware de sessão para autenticação
var session = require("express-session");

// Define a pasta de arquivos estáticos (CSS, imagens, etc)
app.use(express.static('./app/public'));

// Configura o EJS como engine de views (templates)
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Permite receber dados em JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Configura as sessões para login/autenticação
app.use(session({
    secret: "HELLonODE",
    resave: false,
    saveUninitialized: false,
}));

// Importa e usa as rotas definidas no arquivo router.js
var rotas = require('./app/routes/router');
app.use('/', rotas);

// Inicia o servidor na porta definida no .env
app.listen(process.env.APP_PORT, () =>{
    console.log(`Servidor online...\nHttp://localhost:${process.env.APP_PORT}`);
})
// Fim do arquivo app.js
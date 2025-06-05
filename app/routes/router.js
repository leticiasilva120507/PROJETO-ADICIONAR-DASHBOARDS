// Importa o Express e cria um roteador
const express = require('express');
const router = express.Router();
const moment = require("moment");
// Importa middlewares e controllers
const { verificarUsuAutenticado, limparSessao, gravarUsuAutenticado,} = require("../models/autenticador_middleware");
const usuario_controller = require("../controllers/usuario_controller");
const relatorios_controller = require('../controllers/relatorios_controller');

// Rota da página inicial (login)
router.get('/', function(req, res){
    res.render('pages/index', {erros: []});
});

// Rota protegida: lista de relatórios (com paginação)
router.get('/relatorios', verificarUsuAutenticado, relatorios_controller.listarRelatoriosPaginados);


// Rota de login (POST)
router.post("/index", usuario_controller.validacaoFormLog,
    gravarUsuAutenticado,
     function(req,res){
    usuario_controller.login(req, res);
});

// Rota para exibir formulário de edição de relatório
router.get("/editar", function (req, res) {
   relatorios_controller.exibirRelatorioId(req, res);
});

// Rota para excluir relatório
router.get("/excluir", function (req, res) {
  relatorios_controller.excluirRelatorio(req, res);
});

// Rota para exibir formulário de adicionar relatório (agora protegida)
router.get("/adicionar", verificarUsuAutenticado, function (req, res) {
  res.locals.moment = moment;
  res.render("pages/adicionar", { dados: null, listaErros: null });
});

// Rota para adicionar relatório (POST)
router.post("/adicionar", verificarUsuAutenticado, relatorios_controller.regrasValidacao, function (req, res) {
     relatorios_controller.adicionarRelatorios(req, res);
  }
);

// Exporta o roteador para ser usado no app.js
module.exports = router;
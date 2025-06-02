const express = require('express');
const router = express.Router();
const moment = require("moment");
const { verificarUsuAutenticado, limparSessao, gravarUsuAutenticado,} = require("../models/autenticador_middleware");
const usuario_controller = require("../controllers/usuario_controller");
const relatorios_controller = require('../controllers/relatorios_controller');



router.get('/', function(req, res){
    res.render('pages/index', {erros: []});
});

router.get('/relatorios', verificarUsuAutenticado, relatorios_controller.listarRelatorios);

router.post("/index", usuario_controller.validacaoFormLog,
    gravarUsuAutenticado,
     function(req,res){
    usuario_controller.login(req, res);
});

router.get("/editar", function (req, res) {
   relatorios_controller.exibirRelatoriosId(req, res);
});

router.get("/excluir", function (req, res) {
  relatorios_controller.excluirRelatorios(req, res);
});

router.get("/adicionar", function (req, res) {
  res.locals.moment = moment;
  res.render("pages/adicionar", { dados: null, listaErros: null });
});

router.post("/adicionar", relatorios_controller.regrasValidacao, function (req, res) {
     relatorios_controller.adicionarRelatorios(req, res);
  }
);

    
module.exports = router;
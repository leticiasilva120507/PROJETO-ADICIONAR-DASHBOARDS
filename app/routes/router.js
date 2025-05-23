const express = require('express');
const router = express.Router();
const { verificarUsuAutenticado, limparSessao, gravarUsuAutenticado,} = require("../models/autenticador_middleware");
const usuario_controller = require("../controllers/usuario_controller");



router.get('/', function(req, res){
    res.render('pages/index', {"erros": null});
});

router.get('/relatorios', verificarUsuAutenticado, function(req, res){
    res.render('pages/relatorios');
});

router.post("/index", usuario_controller.validacaoFormLog,
    gravarUsuAutenticado,
     function(req,res){
    usuario_controller.login(req, res);
});

    





module.exports = router;
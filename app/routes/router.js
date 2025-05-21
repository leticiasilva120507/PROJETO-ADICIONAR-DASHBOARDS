var express = require('express');
var router = express.Router();
const { verificarUsuAutenticado, limparSessao, gravarUsuAutenticado,} = require("../models/autenticador_middleware");
const usuario_Controller = require("../controllers/usuario_controller");



router.get('/', verificarUsuAutenticado, function(req, res){
    res.render('pages/index', {"erros": null});
});

router.get('/relatorios', verificarUsuAutenticado, function(req, res){
    res.render('pages/relatorios');
});

router.post("/index", usuario_Controller.validacaoFormLog,
    gravarUsuAutenticado,
     function(req,res){
    usuario_Controller.login(req, res);
});

    





module.exports = router;
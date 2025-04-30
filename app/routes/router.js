var express = require('express');
var router = express.Router();
const usuario_Controller = require("../controllers/usuario_controller");

const {body, validationResult} = require("express-validator");



router.get('/', function(req, res){
    res.render('pages/index', {"erros": null, "valores":{"email":"", "senha":""}});
});

router.get('/relatorios', function(req, res){
    res.render('pages/relatorios');
});

router.post("/", usuario_Controller.regrasValidacao, function(req,res){
    usuario_Controller.login(req, res);
});





module.exports = router;
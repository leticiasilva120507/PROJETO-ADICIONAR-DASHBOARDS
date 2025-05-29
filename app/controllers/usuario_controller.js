/* aqui é validado o formulário.
é através do controller que é conectado a validação ao banco de dados
 */

const loginModel = require('../models/login_model'); // me faz conectar a validação ao banco de dados
const bcrypt = require("bcryptjs"); //é uma biblioteca que me faz utilizar funções para criar e comparar senhas criptografadas
var salt = bcrypt.genSaltSync(10);
const {body, validationResult} = require("express-validator");

const usuario_controller = {
    //validação
       validacaoFormLog: [
        body("email").isEmail().withMessage("Insira um email válido!"),
        body("senha").notEmpty().withMessage("Digite a senha!")
       ],


//métodos

login: (req, res) => {
     console.log("Sessão no controller:", req.session.autenticado);
    const erros = validationResult(req);
    // Se houver erros de validação do express-validator
    if (!erros.isEmpty()) {
        console.log("[LOGIN CONTROLLER] Erros express-validator:", erros.array());
        return res.render("pages/index", { erros: erros.array() });
    }
    // Se autenticado, redireciona
    if (req.session.autenticado && req.session.autenticado.id) {
        return res.redirect('/relatorios');
    } else {
        // Log para depuração dos erros vindos do middleware
        console.log("[LOGIN CONTROLLER] Erros middleware:", req.erros);
        return res.render('pages/index', { erros: req.erros || [] });
    }
}



};

module.exports = usuario_controller;
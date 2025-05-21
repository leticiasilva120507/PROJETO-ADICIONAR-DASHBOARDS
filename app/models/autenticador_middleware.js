const { validationResult } = require("express-validator");
const usuario = require("./login_model");
const bcrypt = require("bcryptjs");

verificarUsuAutenticado = (req, res, next) => {
    if (req.session.autenticado) {
        let autenticado = req.session.autenticado;
    } else {

        autenticado = { autenticado: null, id: null,};
    }
    req.session.autenticado = autenticado;
    next();
}

limparSessao = (req, res, next) => {
    req.session.destroy();
    next()
}

gravarUsuAutenticado = async (req, res, next) => {
    let autenticado =  { autenticado: null, id: null };
    erros = validationResult(req)
    if (erros.isEmpty()) {
        var dadosForm = {
            email: req.body.email,
            senha: req.body.senha,
        };
        var results = await usuario.findUserEmail(dadosForm);
        var total = Object.keys(results).length;
        if (total == 1) {
            if (bcrypt.compareSync(dadosForm.senha, results[0].senha)) {
                let autenticado = {
                    autenticado: results[0].email,
                    id: results[0].id
                };
            }
        } 
    } 
    req.session.autenticado = autenticado;
    next();
}



module.exports = {
    verificarUsuAutenticado,
    limparSessao,
    gravarUsuAutenticado,
};
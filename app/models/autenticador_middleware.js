const { validationResult } = require("express-validator");
const usuario = require("./login_model");
const bcrypt = require("bcryptjs");

verificarUsuAutenticado = (req, res, next) => {
     if (req.session.autenticado) {
        var autenticado = req.session.autenticado;
    } else {
        var autenticado = { autenticado: null, id: null };
    }
    req.session.autenticado = autenticado;
    next();
}


limparSessao = (req, res, next) => {
    req.session.destroy();
    next();
}

gravarUsuAutenticado = async (req, res, next) => {
    var autenticado =  { autenticado: null, id: null };
    erros = validationResult(req)
    if (erros.isEmpty()) {
        var dadosForm = {
            email: req.body.email,
            senha: req.body.senha,
        };
        var results = await usuario.findUserEmail(dadosForm);
         console.log('Resultados da consulta:', results);
        var total = Object.keys(results).length;
        if (total == 1) {
            //verifica se o email existe
            //se existir, verifica se a senha está correta
            //se a senha estiver correta, grava o usuário na sessão
            //se não estiver correta, retorna erro
        if (bcrypt.compareSync(dadosForm.senha, results[0].SENHA)) {
        var autenticado = {
        autenticado: results[0].EMAIL,
        id: results[0].ID
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
    gravarUsuAutenticado
};
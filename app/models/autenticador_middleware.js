const { validationResult } = require("express-validator");
const usuario = require("./login_model");
const bcrypt = require("bcryptjs");

verificarUsuAutenticado = (req, res, next) => {
    // Se o usuário está autenticado, permite acesso
    if (req.session.autenticado && req.session.autenticado.id) {
        return next();
    } else {
        // Se não está autenticado, redireciona para a tela de login
        return res.redirect('/');
    }
}

limparSessao = (req, res, next) => {
    req.session.destroy();
    next();
}

const gravarUsuAutenticado = async (req, res, next) => {
    console.log("Entrou no middleware gravarUsuAutenticado");
    let autenticado = { autenticado: null, id: null };
    const erros = validationResult(req);
    if (erros.isEmpty()) {
        const dadosForm = {
            email: req.body.email,
            senha: req.body.senha,
        };
        console.log("E-mail recebido do formulário:", dadosForm.email);
        const results = await usuario.findUserEmail(dadosForm);
        console.log("Resultado da consulta:", results);
        if (results && results.length === 1) {
            console.log("Senha digitada:", dadosForm.senha);
            console.log("Senha do banco:", results[0].SENHA);
            // Verifica a senha, testa agora 
            if (await bcrypt.compareSync(dadosForm.senha, results[0].SENHA)) {
                autenticado = {
                    autenticado: results[0].EMAIL,
                    id: results[0].ID
                };
                console.log("Autenticado no middleware:", autenticado);
                req.session.autenticado = autenticado;
                return next();
            } else {
                // Senha incorreta
                req.erros = [{ path: "senha", msg: "Senha incorreta!" }];
                return next();
            }
        } else {
            // Usuário não encontrado
            req.erros = [{ path: "email", msg: "Usuário não encontrado!" }];
            return next();
        }
    }
    req.session.autenticado = autenticado;
    next();
};


module.exports = {
    verificarUsuAutenticado,
    limparSessao,
    gravarUsuAutenticado
};
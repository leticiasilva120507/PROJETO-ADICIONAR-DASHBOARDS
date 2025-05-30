/*
Arquivo: autenticador_middleware.js

- Importa funções e bibliotecas necessárias para validação, acesso ao banco e criptografia de senha.
- Possui três middlewares principais:
  1. verificarUsuAutenticado: protege rotas, só deixa acessar se estiver logado.
  2. limparSessao: faz logout destruindo a sessão.
  3. gravarUsuAutenticado: faz o login, checa se o formulário está correto, busca o usuário no banco, compara a senha e salva na sessão se estiver tudo certo. Se der erro, envia a mensagem certa para o controller.
- Exporta os middlewares para serem usados nas rotas.
*/

// Importa funções de validação do express-validator
const { validationResult } = require("express-validator");
// Importa o model de usuário para acessar o banco
const usuario = require("./login_model");
// Importa o bcrypt para comparar senhas criptografadas
const bcrypt = require("bcryptjs");

// Middleware que protege páginas: só deixa entrar se estiver logado
verificarUsuAutenticado = (req, res, next) => {
    if (req.session.autenticado && req.session.autenticado.id) {
        // Se está logado, pode acessar
        return next();
    } else {
        // Se não está logado, volta para o login
        return res.redirect('/');
    }
}

// Middleware para logout: limpa a sessão
limparSessao = (req, res, next) => {
    req.session.destroy(); // Sai do sistema
    next();
}

// Middleware que faz o login
const gravarUsuAutenticado = async (req, res, next) => {
    // Pega erros do formulário (ex: campo vazio)
    const erros = validationResult(req);
    if (erros.isEmpty()) { // Se não tem erro de formulário
        // Pega email e senha digitados
        const dadosForm = {
            email: req.body.email,
            senha: req.body.senha,
        };
        // Procura o usuário no banco
        const results = await usuario.findUserEmail(dadosForm);
        if (results && results.length === 1) { // Se achou o usuário
            // Compara a senha digitada com a do banco
            if (await bcrypt.compareSync(dadosForm.senha, results[0].SENHA)) {
                // Se a senha está certa, salva login na sessão
                req.session.autenticado = {
                    autenticado: results[0].EMAIL,
                    id: results[0].ID
                };
                return next(); // Vai para o controller
            } else {
                // Se a senha está errada, manda erro para o controller
                req.erros = [{ path: "senha", msg: "Senha incorreta!" }];
                return next();
            }
        } else {
            // Se não achou o usuário, manda erro para o controller
            req.erros = [{ path: "email", msg: "Usuário não encontrado!" }];
            return next();
        }
    }
    // Se tem erro de formulário, só continua
    next();
};

// Exporta os middlewares para usar nas rotas
module.exports = {
    verificarUsuAutenticado,
    limparSessao,
    gravarUsuAutenticado
};
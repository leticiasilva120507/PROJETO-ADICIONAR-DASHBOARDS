/*
Arquivo: usuario_controller.js

- Faz a validação dos campos do formulário de login.
- Se houver erro de validação, mostra na tela.
- Se o login for bem-sucedido, redireciona para a página de relatórios.
- Se o login falhar (usuário não encontrado ou senha errada), mostra o erro na tela.
- Exporta o controller para ser usado nas rotas.
 */

/* aqui é validado o formulário.
é através do controller que é conectado a validação ao banco de dados
 */

const loginModel = require('../models/login_model'); // Importa o model de login para acessar o banco
const bcrypt = require("bcryptjs"); // Importa o bcrypt para comparar senhas criptografadas
var salt = bcrypt.genSaltSync(10); // Gera um salt para criptografia (usado em cadastro)
const {body, validationResult} = require("express-validator"); // Importa funções de validação

const usuario_controller = {
    // Validação dos campos do formulário de login
       validacaoFormLog: [
        body("email").isEmail().withMessage("Insira um email válido!"), // Valida se o e-mail é válido
        body("senha").notEmpty().withMessage("Digite a senha!") // Valida se a senha não está vazia
       ],


//métodos

login: (req, res) => {
     console.log("Sessão no controller:", req.session.autenticado); // Mostra no terminal o estado da sessão
    const erros = validationResult(req); // Pega os erros de validação do express-validator
    // Se houver erros de validação (ex: e-mail inválido ou senha vazia)
    if (!erros.isEmpty()) {
        console.log("[LOGIN CONTROLLER] Erros express-validator:", erros.array());
        return res.render("pages/index", { erros: erros.array() }); // Renderiza a tela de login com os erros
    }
    // Se o usuário está autenticado, redireciona para a página de relatórios
    if (req.session.autenticado && req.session.autenticado.id) {
        return res.redirect('/relatorios');
    } else {
        // Se não está autenticado, renderiza a tela de login com os erros do middleware (ex: usuário não encontrado ou senha incorreta)
        console.log("[LOGIN CONTROLLER] Erros middleware:", req.erros);
        return res.render('pages/index', { erros: req.erros || [] });
    }
}



};

module.exports = usuario_controller; // Exporta o controller para ser usado nas rotas
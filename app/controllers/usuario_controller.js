const loginModel = require('../models/login_model');
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(12);
const {body, validationResult} = require("express-validator");

const usuarioController = {
    //validação
       validacaoFormLog: [
        body("email").isEmail().withMessage("O email está incorreto!"),
        body("senha").isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper:10, pointsForContainingNumber:10, pointsForContainingSymbol: 10}).withMessage("A senha está incorreta!"),
       ],


//métodos

login: (req, res)=>{
        const erros = validationResult(req);
        if(erros.isEmpty()){
            return res.render("pages/index", {erro:erros})
        }

        if(req.session.autenticado != null){
            res.redirect('/');
        }else{
            res.render('pages/index', {erro:erros})
        }
   


}
};

module.exports = usuarioController;
const loginModel = require('../models/login_model');
const {body, validationResult} = require("express-validator");

const usuarioController = {
    //validação
       validacaoFormLog: [
        body("email").isEmail().withMessage("O email está incorreto!"),
        body("senha").isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper:10, pointsForContainingNumber:10, pointsForContainingSymbol: 10}).withMessage("A senha está incorreta!"),
       ],


//métodos

login: async (req, res)=>{
    try{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            //não tem erro no formulário
            const dadosFormulario = {
                "email":req.body.email,
                "senha":req.body.senha
            };
            let resultado = await loginModel.create (dadosFormulario);

            if(resultado){
                return res.render("pages/index");
            }else{
                return res.render("pages/relatorios",
                {"errors":null, "valores":req.body}
                )
            }

        }else{
            //erro no formulário
            res.render("pages/relatorios",
                {"erro":errors, "valores":req.body});
        }
    }catch(error){
        console.log(error);
        return false;
    }


}
}

module.exports = usuarioController;
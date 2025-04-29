var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('pages/index', {"erros": null, "valores":{"email":"", "senha":""}});
});

router.get('/relatorios', function(req, res){
    res.render('pages/relatorios');
});

const { body, validationResult} = require("express-validator")
 router.post("/index",
    body("email").isEmail({allow_display_name: false, require_display_name: false, allow_utf8_local_part: true, require_tld: true, allow_ip_domain:false, allow_underscores: false, domain_specific_validation:false, blacklisted_chars:"", host_blacklist:[]}).withMessage('Digite um email válido!'),
    body("senha").isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper:10, pointsForContainingNumber:10, pointsForContainingSymbol: 10}).withMessage("A senha está incorreta!"),

    function(req, res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log(errors);
            return res.render('pages/index',{"erros": errors, "valores": req.body, "retorno":null});
        }

        return res.render("pages/relatorios", {"erros":null, "valores":req.body, "retorno":req.body})
    }
 )



module.exports = router;
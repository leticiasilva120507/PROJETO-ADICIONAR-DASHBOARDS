const relatorios_model = require("../models/relatorios_model");
const moment = require("moment");
const { body, validationResult } = require("express-validator");
const relatorios_controller = {
  regrasValidacao: [
    body("link")
      .isLength({ min: 5, max: 100 })
      .withMessage("Nome da Tarefa deve conter de 5 a 45 letras!"),
    body("data_publicacao").isISO8601(),
  ],

  listarRelatorios: async (req, res) => {
    res.locals.moment = moment;
    try {
      results = await relatorios_model.findAll();
      res.render("pages/relatorios", { link: results });
    } catch (e) {
      console.log(e); // exibir os erros no console do vs code
      res.json({ erro: "Falha ao acessar dados" });
    }
  },

  adicionarRelatorios: async (req, res) => {
    res.locals.moment = moment;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render("pages/adicionar", {
        dados: req.body,
        listaErros: errors,
      });
    }
    var dadosForm = {
      link_relatorio: req.body.link,
      data_publicacao_relatorio: req.body.data_publicacao,
    };
    let id_relatorio = req.body.id_relatorio;
    try {
        if(id_relatorio==""){
            results = await relatorios_model.create(dadosForm);
        }else{
            results = await relatorios_model.update(dadosForm,id_relatorio);
        }
      res.redirect("/relatorios");
    } catch (e) {
      console.log(e);
      res.json({ erro: "Falha ao acessar dados" });
    }
  },

  excluirRelatorio: async (req, res) => {
    let { id } = req.query;
    try {
      results = await relatorios_controller.delete(id);
      res.redirect("/relatorios");
    } catch (e) {
      console.log(e);
      res.json({ erro: "Falha ao acessar dados" });
    }
  },

  exibirRelatorioId: async (req, res) => {
    res.locals.moment = moment;
    let { id } = req.query;
    console.log(id);
    try {
      let relatorio = await relatorios_model.findId(id);
      res.render("pages/adicionar", {
        dados: {
          id_relatorio: id,
          link: relatorio[0].link,
          data_publicacao: relatorio[0].data_publicacao,
        },
        listaErros: null,
      });
    } catch (e) {
      console.log(e);
      res.json({ erro: "Falha ao acessar dados" });
    }
  },

 
  };


module.exports = relatorios_controller;

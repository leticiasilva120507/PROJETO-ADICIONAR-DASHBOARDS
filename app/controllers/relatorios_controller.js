// Controller responsável por gerenciar relatórios (listar, adicionar, editar, excluir)
const relatorios_model = require("../models/relatorios_model");
const moment = require("moment");
const { body, validationResult } = require("express-validator");

const relatorios_controller = {
  // Validações dos campos do formulário de relatório
  regrasValidacao: [
    body("link")
      .isLength({ min: 5, max: 500 })
      .withMessage("Link deve conter de 5 a 500 caracteres!"),
    body("nome_link").isLength({ min: 5, max: 100 })
      .withMessage("Nome do Relatório deve conter de 5 a 100 caracteres!"),
    body("data_publicacao").isISO8601(),
  ],

  // Lista todos os relatórios e envia para a view
  listarRelatorios: async (req, res) => {
    res.locals.moment = moment;
    try {
      results = await relatorios_model.findAll();
      res.render("pages/relatorios", { link: results });
    } catch (e) {
      console.log(e); // exibe erro no console
      res.json({ erro: "Falha ao acessar dados" });
    }
  },

   listarRelatoriosPaginados: async (req, res) => {
    res.locals.moment = moment;
    try {
        // Garante que a página seja um número inteiro e >= 1
        let pagina = parseInt(req.query.pagina) || 1;
        if (pagina < 1) pagina = 1;
        let regPagina = 5;
        let inicio = (pagina - 1) * regPagina;
        let totReg = await relatorios_model.totalReg();
        let totPaginas = Math.ceil(totReg[0].total / regPagina);
        let results = await relatorios_model.findPage(pagina, regPagina);
        let paginador = totReg[0].total <= regPagina 
            ? null 
            : { "pagina_atual": pagina, "total_reg": totReg[0].total, "total_paginas": totPaginas };
        res.render("pages/relatorios", { link: results, paginador: paginador });
    } catch (e) {
        console.log(e); // exibir os erros no console do vs code
        res.json({ erro: "Falha ao acessar dados" });
    }
},

  // Adiciona ou edita um relatório
  adicionarRelatorios: async (req, res) => {
    res.locals.moment = moment;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Se houver erros de validação, retorna para o formulário
      console.log(errors);
      return res.render("pages/adicionar", {
        dados: req.body,
        listaErros: errors,
      });
    }
    // Monta objeto com os dados do formulário
    var dadosForm = {
      link_relatorio: req.body.link,
      nome_link_relatorio: req.body.nome_link,
      data_publicacao_relatorio: req.body.data_publicacao,
    };
    let id_relatorio = req.body.id_relatorio;
    try {
        // Se não tem id, cria novo. Se tem id, edita existente.
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

  // Exclui um relatório pelo id
  excluirRelatorio: async (req, res) => {
    let { id } = req.query;
    try {
      results = await relatorios_model.delete(id);
      res.redirect("/relatorios");
    } catch (e) {
      console.log(e);
      res.json({ erro: "Falha ao acessar dados" });
    }
  },

  // Busca um relatório pelo id e envia para a tela de edição
  exibirRelatorioId: async (req, res) => {
    res.locals.moment = moment;
    let { id } = req.query;
    console.log(id);
    try {
      let relatorio = await relatorios_model.findId(id);
      res.render("pages/adicionar", {
        dados: {
          id_relatorio: id,
          link: relatorio[0].link_relatorio,
          nome_link: relatorio[0].nome_link_relatorio,
          data_publicacao: relatorio[0].data_publicacao_relatorio,
        },
        listaErros: null,
      });
    } catch (e) {
      console.log(e);
      res.json({ erro: "Falha ao acessar dados" });
    }
  },

};

// Exporta o controller para ser usado nas rotas
module.exports = relatorios_controller;

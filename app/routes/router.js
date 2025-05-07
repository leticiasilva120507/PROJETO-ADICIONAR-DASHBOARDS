
const express = require("express");
const router = express.Router();

const {
  gravarUsuAutenticado,
  limparSessao
} = require("../models/autenticador_middleware");

const usuarioController = require("../controllers/usuarioController");

// Tela de login
router.get("/login", (req, res) => {
  res.render("pages/login", { listaErros: null });
});

// Processar login
router.post(
  "/login",
  usuarioController.regrasValidacaoFormLogin,
  usuarioController.logar,           // Valida e autentica
  gravarUsuAutenticado               // Grava sessão se login for válido
);

// Logout
router.get("/sair", limparSessao, (req, res) => {
  res.redirect("/login");
});

module.exports = router;
"use strict";

const express = require("express");
const router = express.Router();

//teste
const pessoaController = require('../controllers/medico-controller');

router.get("/", (req, res, next) => {
  res.status(200).send({
    title: "Node API",
    version: "0.0.1",
  });
});

router.post('/cadastrar-medico', pessoaController.CadastrarMedico);
router.put('/atualizar-medico/:id', pessoaController.AtualizarMedico);

module.exports = router;

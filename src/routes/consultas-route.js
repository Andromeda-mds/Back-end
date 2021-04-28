"use strict"

const express = require("express");
const router = express.Router();
const authService = require('../auth');

// injeção de dependência
const consultaController = require("../controllers/consulta-controller");

router.post("/:id", authService.authorize, consultaController.CadastrarConsulta);

module.exports = router;
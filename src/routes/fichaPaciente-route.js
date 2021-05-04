"use strict"

const express = require("express");
const router = express.Router();
const authService = require('../auth');

// injeção de dependência
const fichaController = require("../controllers/fichaPaciente-controller");

router.get("/consultas/:id", authService.authorize, fichaController.ListarTodasConsultas);
router.get("/paciente/:id", authService.authorize, fichaController.BuscarFichaByPaciente);
router.get("/:id", authService.authorize, fichaController.BuscarFichaById);

module.exports = router;
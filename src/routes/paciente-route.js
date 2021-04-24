"use strict";

const express = require("express");
const router = express.Router();
const authService = require('../auth');

const pacienteController = require("../controllers/paciente-controller");

router.post("/", authService.authorize, pacienteController.CadastrarPaciente);
router.put("/:id", authService.authorize, pacienteController.AtualizarPaciente);
router.get("/:id", authService.authorize, pacienteController.BuscarPacienteById);
router.get("/:nome", authService.authorize, pacienteController.BuscarPacienteByName);

module.exports = router;

"use strict"

const express = require("express");
const router = express.Router();
const authService = require('../auth');

// injeção de dependência
const consultaController = require("../controllers/consulta-controller");

router.post("/:id", authService.authorize, consultaController.CadastrarConsulta);
router.put("/:id", authService.authorize, consultaController.AtualizarConsulta);
router.get("/:id", authService.authorize, consultaController.BuscarConsultaById);
router.get("/medico/:id", authService.authorize, consultaController.BuscarConsultaByMedico);

module.exports = router;
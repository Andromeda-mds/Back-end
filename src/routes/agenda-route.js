"use-strict"

const express = require("express");
const router = express.Router();
const authService = require('../auth');

// injeção de dependência
const agendaController = require("../controllers/agenda-controller");

router.post("/:id", authService.authorize, agendaController.CadastrarAgenda);
router.get("/:id", authService.authorize, agendaController.BuscarAgendaById);
router.get("/medico/:id", authService.authorize, agendaController.BuscarAgendaByMedico);

module.exports = router;
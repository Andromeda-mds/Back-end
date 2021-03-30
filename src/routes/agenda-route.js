"use-strict"

const express = require("express");
const router = express.Router();

// injeção de dependência
const agendaController = require("../controllers/agenda-controller");

router.post("/:id", agendaController.CadastrarAgenda);

module.exports = router;
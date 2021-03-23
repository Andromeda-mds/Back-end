"use strict";

const express = require("express");
const router = express.Router();

const medicoController = require('../controllers/medico-controller');

router.post("/", medicoController.CadastrarMedico);
router.put("/agenda/:id", medicoController.CadastrarAgendaDoMedico);
router.put('/:id', medicoController.AtualizarMedico);
router.get('/:id', medicoController.BuscarMedicoById);

module.exports = router;
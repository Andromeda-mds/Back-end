"use strict";

const express = require("express");
const router = express.Router();

const medicoController = require("../controllers/medico-controller");
const { route } = require("./index-route");

router.post("/", medicoController.CadastrarMedico);
router.put("/agenda/:id", medicoController.CadastrarAgendaDoMedico);
router.put("/:id", medicoController.AtualizarMedico);
router.get("/:id", medicoController.BuscarMedicoById);
router.get("/crm/:crm", medicoController.BuscarMedicoByNome);

module.exports = router;

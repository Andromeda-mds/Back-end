"use strict";

const express = require("express");
const router = express.Router();
const authService = require('../auth');

const medicoController = require("../controllers/medico-controller");

router.post("/", authService.authorize ,medicoController.CadastrarMedico);
router.put("/:id", medicoController.AtualizarMedico);
router.get("/:id", medicoController.BuscarMedicoById);
router.get("/crm/:crm", medicoController.BuscarMedicoByCRM);
router.get("/nome/:nome", medicoController.BuscarMedicoByNome);
router.get("/", medicoController.ListarMedicos);
router.post('/authenticate', medicoController.authenticate);

module.exports = router;

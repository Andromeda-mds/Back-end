"use strict";

const express = require("express");
const router = express.Router();
const authService = require('../auth');

const medicoController = require("../controllers/medico-controller");

router.post("/", authService.authorize, medicoController.CadastrarMedico);
router.post('/authenticate', medicoController.authenticate);
router.put("/:id", authService.authorize, medicoController.AtualizarMedico);
router.get("/:id", authService.authorize, medicoController.BuscarMedicoById);
router.get("/crm/:crm", authService.authorize, medicoController.BuscarMedicoByCRM);
router.get("/nome/:nome", authService.authorize ,medicoController.BuscarMedicoByNome);
router.get("/", authService.authorize, medicoController.ListarMedicos);

module.exports = router;

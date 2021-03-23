"use strict";

const express = require("express");
const router = express.Router();

const medicoController = require("../controllers/medico-controller");

router.post("/", medicoController.CadastrarMedico);
router.put("/:id", medicoController.AtualizarMedico);
router.get("/:id", medicoController.BuscarMedicoById);
router.get("/crm/:crm", medicoController.BuscarMedicoByCRM);
router.get("/nome/:nome", medicoController.BuscarMedicoByNome);

module.exports = router;

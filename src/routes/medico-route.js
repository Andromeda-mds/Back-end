"use strict";

const express = require("express");
const router = express.Router();

const medicoController = require('../controllers/medico-controller');

router.post("/cadastrar", medicoController.CadastrarMedico);

module.exports = router;
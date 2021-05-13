"use strict"

const express = require("express");
const router = express.Router();
const authService = require('../auth');

const filaController = require("../controllers/filaDeEspera-controller");

router.post("/", authService.authorize, filaController.CadastrarFilaDeEspera);
router.post("/:id", authService.authorize, filaController.AdicionarConsulta);
router.post("/remover/:id", authService.authorize, filaController.RemoverConsulta);
router.get("/:id", authService.authorize, filaController.BuscarLista);

module.exports = router;
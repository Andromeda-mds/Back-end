'use strict'

const express = require("express");
const router = express.Router();
const authService = require('../auth');
const SecretarioController = require("../controllers/secretario-controller");

router.post('/', authService.authorize, SecretarioController.CadastrarSecretario);
router.post('/authenticate', SecretarioController.authenticate);
router.put('/:id', authService.authorize, SecretarioController.AtualizarSecretario);
router.get('/:id', authService.authorize, SecretarioController.BuscarSecretarioById);
router.get('/:matricula', authService.authorize, SecretarioController.BuscarSecretarioByMatricula);

module.exports = router;
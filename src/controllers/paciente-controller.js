"use strict";

const mongoose = require("mongoose");
const repository = require("../repositories/secretario-repository");
const pacienteRepository = require("../repositories/funcionario-repository");
const validation = require("../services/inputValidator");
const EResponseValidate = require("../Enums/EResponseValidate");
const Paciente = mongoose.model("Paciente");

exports.CadastrarPaciente = async (req, res, next) => {}

exports.AtualizarPaciente = async (req, res, next) => {}

exports.BuscarPacienteById = async (req, res, next) => {}

exports.BuscarPacienteByName = async (req, res, next) => {}
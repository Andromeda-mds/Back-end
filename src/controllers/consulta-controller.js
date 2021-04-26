"use strict";

const mongoose = require("mongoose");
const consultaRepository = require("../repositories/consulta-repository");
const validation = require("../services/inputValidator");
const EResponseValidate = require("../Enums/EResponseValidate");
const Consulta = mongoose.model("Consulta");

exports.CadastrarConsulta = async (req, res, next) => {};

exports.AtualizarConsulta = async (req, res, next) => {};

exports.BuscarConsultaById = async (req, res, next) => {};

exports.BuscarConsultaByMedico = async (req, res, next) => {};

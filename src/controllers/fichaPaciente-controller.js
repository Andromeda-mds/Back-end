"use strict";

const mongoose = require("mongoose");
const FichaRepository = require("../repositories/fichaPaciente-repository");
const validation = require("../services/inputValidator");
const EResponseValidate = require("../Enums/EResponseValidate");
const Ficha = mongoose.model("FichaPaciente");

exports.AtualizarFicha = async (req, res, next) => {}

exports.BuscarFichaById = async (req, res, next) => {}

exports.BuscarFichaByPaciente = async (req, res, next) => {}
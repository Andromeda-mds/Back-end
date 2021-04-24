"use strict";

const mongoose = require("mongoose");
const Ficha = mongoose.model("FichaPaciente");

exports.cadastrarFicha = async (data) => {
  var ficha = new Ficha(data);
  await ficha.save();
  return ficha;
};

exports.atualizarFicha = async (data) => {};

exports.buscarFichaById = async (id) => {};

exports.buscarFichaByPaciente = async (paciente) => {};

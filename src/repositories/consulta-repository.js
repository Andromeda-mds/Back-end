"use strict";

const mongoose = require("mongoose");
const Consulta = mongoose.model("Consulta");

exports.cadastrarConsulta = async (data) => {
  var consulta = new Consulta(data);
  await consulta.save();
  return consulta;
};

exports.atualizarConsulta = async (data) => {};

exports.buscarConsultaById = async (id) => {};

exports.buscarConsultaByMedico = async (medico) => {};
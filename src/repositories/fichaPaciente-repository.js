"use strict";

const mongoose = require("mongoose");
const Ficha = mongoose.model("FichaPaciente");
const Paciente = mongoose.model("Paciente");

exports.cadastrarFicha = async (data) => {
  var ficha = new Ficha(data);
  await ficha.save();
  return ficha;
};

exports.atualizarFicha = async (id, data) => {
  await Ficha.findOneAndUpdate(id, {
    $set: {
      observacoes: data.observacoes,
    },
  });
}; 

exports.adicionarConsulta = async (fichaId, consultaId) => {
  var _ficha = await Ficha.findById(fichaId);
  _ficha.consultas.unshift(consultaId);
  var res = await _ficha.save();
  return res; 
}

exports.buscarFichaById = async (id) => {
  var data = await Ficha.findById(id);
  return data;
};

exports.buscarFichaByPaciente = async (pacienteId) => {
  var _paciente = await Paciente.findById(pacienteId);
  var query = await Ficha.where({ paciente: _paciente });
  var data = await query.findOne();
  return data;
};

"use strict";

const mongoose = require("mongoose");
const EDbStatusReturn = require("../Enums/EDbStatusReturn");
const Consulta = mongoose.model("Consulta");
const Agenda = mongoose.model("Agenda");
const Ficha = mongoose.model("FichaPaciente")

exports.cadastrarConsulta = async (data) => {
  var consulta = new Consulta(data);
  var res = await consulta.save();
  return res;
};

exports.atualizarConsulta = async (id, data) => {
  try {
    var _consulta = await Consulta.findById(id);
    _consulta.medico = data.medico != null ? data.medico : _consulta.medico;
    _consulta.data = data.data != null ? data.data : _consulta.data;
    await _consulta.save();
    return EDbStatusReturn.DB_SAVED_OK;
  } catch {
    return EDbStatusReturn.DB_GENERAL_EXCEPTION;
  }
};

exports.buscarConsultaById = async (id) => {
  var _consulta = await Consulta.findById(id);
  return _consulta;
};

exports.buscarConsultaByMedico = async (medicoid) => {
  var query = Consulta.where({ medico: medicoid });
  var _consultas = await query.find();
  return _consultas;
};

exports.removerConsulta = async (consultaId) => {
  await Agenda.findOneAndUpdate({ horariosPreenchidos: consultaId }, { $pull: { "horariosPreenchidos": consultaId } }, { new: true });
  await Ficha.findOneAndUpdate({ consultas: consultaId }, { $pull: { consultas: consultaId } }, { new: true });
  var res = await Consulta.findByIdAndDelete(consultaId);
  return res;
}

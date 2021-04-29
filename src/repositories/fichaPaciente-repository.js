"use strict";

const mongoose = require("mongoose");
const Ficha = mongoose.model("FichaPaciente");
const Paciente = mongoose.model("Paciente");
const EDbStatusReturn = require("../Enums/EDbStatusReturn");
const pacienteRepository = require("../repositories/paciente-repository");

exports.cadastrarFicha = async (data) => {
  var ficha = new Ficha(data);
  var res = await ficha.save();
  return res;
};

exports.atualizarFicha = async (id, data) => {
  try {
    var _ficha = await Ficha.findById(id);
    _ficha.observacoes = data.observacoes != null ? data.observacoes :  _ficha.observacoes;
    _ficha.consultas = data.consultas != null ? data.consultas : _ficha.consultas;
    await _ficha.save();
    return EDbStatusReturn.DB_SAVED_OK;
  } catch {
    return EDbStatusReturn.DB_GENERAL_EXCEPTION;
  }
};

exports.adicionarConsulta = async (fichaId, consultaId) => {
  try {
    var _ficha = await Ficha.findById(fichaId);
    _ficha.consultas.unshift(consultaId);
    await _ficha.save();
    return EDbStatusReturn.DB_SAVED_OK;
  } catch {
    return EDbStatusReturn.DB_GENERAL_EXCEPTION;
  }
};

exports.buscarFichaById = async (id) => {
  var data = await Ficha.findById(id);
  return data;
};

exports.buscarFichaByPaciente = async (pacienteId) => {
  var _paciente = await pacienteRepository.buscarPacienteById(pacienteId);
  var query = Ficha.where({ paciente: _paciente._id });
  var data = await query.findOne();
  return data;
};

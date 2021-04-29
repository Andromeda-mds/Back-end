"use strict";

const mongoose = require("mongoose");
const EDbStatusReturn = require("../Enums/EDbStatusReturn");
const Agenda = mongoose.model("Agenda");

exports.cadastrarAgenda = async (data) => {
  const novaAgenda = new Agenda(data);
  const res = await novaAgenda.save();
  return res;
};

exports.atualizarAgenda = async (agendaId, data) => {
  var _agenda = await Agenda.findById(agendaId);
  _agenda.horariosDisponiveis =
    data.horariosDisponiveis != null
      ? data.horariosDisponiveis
      : _agenda.horariosDisponiveis;
  var res = await _agenda.save();
  return res;
};

exports.buscarAgendaById = async (id) => {
  var _agenda = await Agenda.findById(id);
  return _agenda;
};

exports.preencherUmHorario = async (agendaId, consultaId) => {
  try {
    var _agenda = await Agenda.findById(agendaId);
    _agenda.horariosPreenchidos.push(consultaId);
    await _agenda.save();
    return EDbStatusReturn.DB_SAVED_OK;
  }
  catch{
    return EDbStatusReturn.DB_GENERAL_EXCEPTION;
  }
};

exports.adicionarHorarioDisponivel = async (agendaId, data) => {};

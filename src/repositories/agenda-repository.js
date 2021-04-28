"use strict";

const mongoose = require("mongoose");
const Agenda = mongoose.model("Agenda");

exports.cadastrarAgenda = async (data) => {
  const novaAgenda = new Agenda(data);
  const res = novaAgenda._id;
  await novaAgenda.save();
  return res;
};

exports.atualizarAgenda = async (agendaId, data) => {};

exports.adicionarHorarioDisponivel = async (agendaId, data) => {};

exports.preencherUmHorario = async (agendaId, data) => {};

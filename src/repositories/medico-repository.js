"use strict";

const mongoose = require("mongoose");
const Medico = mongoose.model("Medico");

exports.atualizarMedico = async (id, data) => {
  await Medico.findByIdAndUpdate(id, {
    $set: {
      nomeCompleto: data.nomeCompleto,
      cpf: data.cpf,
      dataNascimento: data.dataNascimento,
      email: data.email,
      telefone: data.telefone,
      endereco: data.endereco,
      senhaAcesso: data.senhaAcesso,
      especialidade: data.especialidade,
      crm: data.crm,
    },
  });
};

exports.buscarMedicoById = async (id) => {
  const res = await Medico.findById(id);
  return res;
};

exports.cadastrarAgendaDoMedico = async (medicoId, agendaId) => {
  const res = await Medico.findByIdAndUpdate(medicoId, {
    $set: {
      agenda: agendaId,
    },
  });
  return res;
};

exports.buscarMedicoByNome = async (nomeCompleto) => {
  const s = nomeCompleto;
  const regex = new RegExp(s, "i");
  const res = await Medico.find({ "nomeCompleto": { "$regex": regex } });
  return res;
};

exports.buscarMedicoByCRM = async (crm) => {
  const query = Medico.where({ crm: crm });
  const res = await query.findOne();
  return res;
};

exports.listarMedicos = async () => {
  const res = await Medico.find();
  return res;
};

exports.authenticate = async (data) => {
  const res = await Medico.findOne({
    email: data.email,
    senhaAcesso: data.senhaAcesso,
  });
  return res;
};

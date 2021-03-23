"use-strict";

const mongoose = require("mongoose");
const Medico = mongoose.model("Medico");
const Agenda = mongoose.model("Agenda");

exports.cadastrarMedico = async (data) => {
  var medico = new Medico(data);
  await medico.save();
};

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
      crm: data.crm,
      agenda: data.agenda,
    },
  });
};

exports.buscarMedicoById = async (id) => {
  const res = await Medico.findById(id);
  return res;
};

exports.cadastrarAgendaDoMedico = async (id, data) => {
  var agenda = new Agenda(data);
  const res = await Agenda.save(agenda);
  console.log(res);
  await Medico.findByIdAndUpdate(id, {
    $set: {
      agenda: res.id,
    },
  });
};

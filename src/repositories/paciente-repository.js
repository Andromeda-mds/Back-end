"use strict";

const mongoose = require("mongoose");
const Paciente = mongoose.model("Paciente");

exports.cadastrarPaciente = async (data) => {
  var paciente = new Paciente(data);
  await paciente.save();
  return paciente;
};

exports.atualizarPaciente = async (id, data) => {

  const _paciente = await Paciente.findByIdAndUpdate(id, {
    $set: {
      nomeCompleto: data.nomeCompleto,
      cpf: data.cpf,
      dataNascimento: data.dataNascimento,
      email: data.email,
      telefone: data.telefone,
      endereco: data.endereco,
      convenio: data.convenio,
    },
  });
  return _paciente;
};

exports.buscarPacienteById = async (id) => {
  const res = await Paciente.findById(id);
  return res;
};

exports.buscarPacienteByName = async (name) => {
  const s = name;
  const regex = new RegExp(s, "i");
  const res = await Paciente.find({ "nomeCompleto": { "$regex": regex } });
  return res;
};

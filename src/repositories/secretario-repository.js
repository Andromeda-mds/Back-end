"use strict";

const mongoose = require("mongoose");
const Secretario = mongoose.model("Secretario");

exports.cadastrarSecretario = async (data) => {
  var secretario = new Secretario(data);
  await secretario.save();
};

exports.atualizarSecretario = async (id, data) => {
  await Secretario.findByIdAndUpdate(id, {
    $set: {
      nomeCompleto: data.nomeCompleto,
      cpf: data.cpf,
      dataNascimento: data.dataNascimento,
      email: data.email,
      telefone: data.telefone,
      endereco: data.endereco,
      senhaAcesso: data.senhaAcesso,
      matricula: data.matricula,
    },
  });
};

exports.buscarSecretarioById = async (id) => {
  const res = await Secretario.findById(id);
  return res;
};

exports.buscarSecretarioByNome = async (nomeCompleto) => {
  const query = Secretario.where({ nomeCompleto: nomeCompleto });
  const res = await query.findOne();
  return res;
};

exports.buscarSecretarioBymatricula = async (matricula) => {
  const query = Secretario.where({ matricula: matricula });
  const res = await query.findOne();
  return res;
};


exports.authenticate = async (data) => {
  const res = await Secretario.findOne({
    email: data.email,
    senhaAcesso: data.senhaAcesso,
  });
  return res;
};

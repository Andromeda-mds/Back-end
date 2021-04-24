"use strict";

const mongoose = require("mongoose");
const Paciente = mongoose.model("Paciente");

exports.cadastrarPaciente = async (data) => {
    var paciente = new Paciente(data) 
    await paciente.save();
};

exports.atualizarPaciente = async (id, data) => {

    // var paciente = await Paciente.findById(id);

    await Paciente.findByIdAndUpdate(id, {
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
  };
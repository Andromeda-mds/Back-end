"use strict";

const mongoose = require("mongoose");
const pacienteRepository = require("../repositories/paciente-repository");
const fichaRepository = require("../repositories/fichaPaciente-repository");
const prontuarioRepository = require("../repositories/prontuario-repository");
const validation = require("../services/inputValidator");
const EResponseValidate = require("../Enums/EResponseValidate");
const Paciente = mongoose.model("Paciente");

exports.CadastrarPaciente = async (req, res, next) => {
  //Re-hidratação
  const data = req.body;

  if (validation.validateNomeCompleto(data) == EResponseValidate.invalid) {
    return res.status(400).send({
      message: "O nome deve conter, pelo menos, 3 caracteres.",
      nomeCompleto: data.nomeCompleto,
    });
  }

  if (validation.validateCPF(data) == EResponseValidate.invalid) {
    return res.status(400).send({
      message: "CPF inválido",
      cpf: data.cpf,
    });
  }

  if (validation.validateEmail(data) == EResponseValidate.invalid) {
    return res.status(400).send({
      message: "Email inválido.",
      email: data.email,
    });
  }

  try {
    var _paciente = await pacienteRepository.cadastrarPaciente({
      nomeCompleto: req.body.nomeCompleto,
      cpf: req.body.cpf,
      dataNascimento: req.body.dataNascimento,
      email: req.body.email,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      convenio: req.body.convenio,
    });

    var _ficha = await fichaRepository.cadastrarFicha({
      paciente: _paciente._id,
    });

    res.status(201).send({
      message: "Paciente cadastrado com sucesso.",
      item: {
        paciente: _paciente,
        fichaPaciente: _ficha,
      },
    });
  } catch {
    res.status(500).send({
      message: "Não foi possível executar a requisição.",
      item: req.body,
    });
  }
};

exports.AtualizarPaciente = async (req, res, next) => {};

exports.BuscarPacienteById = async (req, res, next) => {};

exports.BuscarPacienteByName = async (req, res, next) => {};

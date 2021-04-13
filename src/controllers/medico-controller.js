"use strict";

const mongoose = require("mongoose");
const repository = require("../repositories/medico-repository");
const md5 = require("md5");
const authService = require("../auth");

exports.CadastrarMedico = async (req, res, next) => {
  const data = req.body;

  // Fail fast validate
  
  try {
    await repository.cadastrarMedico({
      nomeCompleto: req.body.nomeCompleto,
      cpf: req.body.cpf,
      dataNascimento: req.body.dataNascimento,
      email: req.body.email,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      especialidade: req.body.especialidade,
      crm: req.body.crm,
      senhaAcesso: md5(req.body.senhaAcesso),
    });
    res.status(201).send({
      message: "Médico cadastrado com sucesso.",
      item: req.body,
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha na requisição.",
    });
  }
};

exports.AtualizarMedico = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  try {
    repository.atualizarMedico(id, data);
    res.status(201).send({
      message: "Médico atualizado com sucesso.",
      item: data,
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha na requisição",
      item: e,
    });
  }
};

exports.BuscarMedicoById = async (req, res, next) => {
  const id = req.params.id;
  // fail fast validate
  if (id === null || id === undefined)
    return res.status(400).send({
      message: "Id inválido",
    });

  try {
    var data = await repository.buscarMedicoById(id);
    res.status(201).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Ocorreu um erro na requisição.",
    });
  }
};

exports.BuscarMedicoByNome = async (req, res, next) => {
  const nome = req.params.nome;
  try {
    var data = await repository.buscarMedicoByNome(nome);
    res.status(201).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Ocorreu um erro na requisição.",
    });
  }
};

exports.BuscarMedicoByCRM = async (req, res, next) => {
  const crm = req.params.crm;

  try {
    const data = await repository.buscarMedicoByCRM(crm);
    res.status(201).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Não foi possível processar a requisição.",
    });
  }
};

exports.ListarMedicos = async (req, res, nex) => {
  try {
    const data = await repository.listarMedicos();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Ops, tivemos algum problema.\nTente novamente mais tarde",
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const medico = await repository.authenticate({
      email: req.body.email,
      senhaAcesso: md5(req.body.senhaAcesso),
    });

    if (!medico) {
      res.status(404).send({
        message: "Usuário ou Senha inválidos",
      });
      return;
    }

    const token = await authService.generateToken({
      _id: medico._id,
      email: medico.email,
      nome: medico.nomeCompleto,
    });

    res.status(201).send({
      token: token,
      data: {
        email: medico.email,
        nome: medico.nomeCompleto,
      },
    });
  } catch (e) {
    res.status(500).send({
      message: "não foi possível autenticar o usuário",
    });
  }
};

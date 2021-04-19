"use strict";

const mongoose = require("mongoose");
const repository = require("../repositories/secretario-repository");
const funcionarioRepository = require("../repositories/funcionario-repository");
const md5 = require("md5");
const authService = require("../auth");
const validation = require("../services/inputValidator");
const EResponseValidate = require("../Enums/EResponseValidate");
const Secretario = mongoose.model("Secretario");


exports.CadastrarSecretario = async (req, res, next) => {
  const data = req.body;

  if(validation.validateNomeCompleto(data) == EResponseValidate.invalid)
  {
    return res.status(400).send({
      message: "O nome deve conter, pelo menos, 3 caracteres.",
      nomeCompleto: data.nomeCompleto
    })
  }

  if(validation.validateCPF(data) == EResponseValidate.invalid)
  {
    return res.status(400).send({
      message: "CPF inválido",
      cpf: data.cpf
    })
  }

  if(validation.validateEmail(data) == EResponseValidate.invalid)
  {
    return res.status(400).send({
      message: "Email inválido.",
      email: data.email
    })
  }

  try {
    await funcionarioRepository.cadastrarFuncionario({
      nomeCompleto: req.body.nomeCompleto,
      cpf: req.body.cpf,
      dataNascimento: req.body.dataNascimento,
      email: req.body.email,
      telefone: req.body.telefone,
      endereco: req.body.endereco,
      matricula: req.body.matricula,
      senhaAcesso: md5(req.body.senhaAcesso),
    }, Secretario);
    res.status(201).send({
      message: "Secretário cadastrado com sucesso.",
      item: req.body,
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha na requisição.",
    });
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const secretario = await repository.authenticate({
      email: req.body.email,
      senhaAcesso: md5(req.body.senhaAcesso),
    });
    
    console.log("Teste")
    

    if (!secretario) {
      res.status(404).send({
        message: "Usuário ou Senha inválidos",
      });
      return;
    }

    const token = await authService.generateToken({
      _id: secretario._id,
      email: secretario.email,
      nome: secretario.nomeCompleto,
    });

    res.status(201).send({
      token: token,
      data: {
        email: secretario.email,
        nome: secretario.nomeCompleto,
      },
    });
  } catch (e) {
    res.status(500).send({
      message: "não foi possível autenticar o usuário",
    });
  }
};

exports.AtualizarSecretario = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  validation.validateNovaSenha(data);

  try {
    repository.atualizarSecretario(id, data);
    res.status(201).send({
      message: "Secretário atualizado com sucesso.",
      item: data,
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha na requisição",
      error: e,
    });
  }
};


exports.BuscarSecretarioById = async (req, res, next) => {
  const id = req.params.id;
  // fail fast validate
  if (id === null || id === undefined)
    return res.status(400).send({
      message: "Id inválido",
    });

  try {
    var data = await repository.buscarSecretarioById(id);
    res.status(201).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Ocorreu um erro na requisição.",
    });
  }
};

exports.BuscarSecretarioByMatricula = async (req, res, next) => {
  const matricula = req.params.matricula;

  try {
    const data = await repository.buscarSecretarioBymatricula(matricula);
    res.status(201).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Não foi possível processar a requisição.",
    });
  }
};

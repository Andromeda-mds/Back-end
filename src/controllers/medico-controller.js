"use strict";

const mongoose = require("mongoose");
const repository = require("../repositories/medico-repository");
const md5 = require("md5");
const authService = require("../auth");
const validation = require("../services/inputValidator");
const funcionarioRepository = require("../repositories/funcionario-repository");
const Medico = mongoose.model("Medico");
const EResponseValidate = require("../Enums/EResponseValidate");
const _email = require("../services/email");
const AgendaRepository = require("../repositories/agenda-repository")



exports.CadastrarMedico = async (req, res) => {
  const data = req.body;

  // Fail fast validate

  if (validation.validateNomeCompleto(data) == EResponseValidate.invalid) {
    return res.status(400).send({
      message: "O nome deve conter, pelo menos, 3 caracteres.",
      nomeCompleto: data.nomeCompleto
    })
  }

  if (validation.validateCPF(data) == EResponseValidate.invalid) {
    return res.status(400).send({
      message: "CPF inválido",
      cpf: data.cpf
    })
  }

  if (validation.validateEmail(data) == EResponseValidate.invalid) {
    return res.status(400).send({
      message: "Email inválido.",
      email: data.email
    })
  }

  var email_em_uso = await validation.emailEmUso(data.email);
  if (email_em_uso == EResponseValidate.invalid) {
    return res.status(400).send({
      message: "Este e-mail já está em uso.",
      email: data.email
    })
  }

  try {
    var _res = await funcionarioRepository.cadastrarFuncionario({
      nomeCompleto: data.nomeCompleto,
      cpf: data.cpf,
      dataNascimento: data.dataNascimento,
      email: data.email,
      telefone: data.telefone,
      endereco: data.endereco,
      especialidade: data.especialidade,
      crm: data.crm,
      senhaAcesso: md5(data.senhaAcesso),
    }, Medico);
    var medicoId = _res._id;
    var data_agenda = {
      "horariosDisponiveis": [
        {
          "dia": "1",
          "periodo": "manha",
          "horarios": ["1", "2", "3", "4"]
        },
        {
          "dia": "2",
          "periodo": "manha",
          "horarios": ["1", "2", "3", "4"]
        },
        {
          "dia": "3",
          "periodo": "manha",
          "horarios": ["1", "2", "3", "4"]
        },
        {
          "dia": "4",
          "periodo": "manha",
          "horarios": ["1", "2", "3", "4"]
        },
        {
          "dia": "5",
          "periodo": "manha",
          "horarios": ["1", "2", "3", "4"]
        },
        {
          "dia": "1",
          "periodo": "tarde",
          "horarios": ["1", "2", "3", "4"]
        },
        {
          "dia": "2",
          "periodo": "tarde",
          "horarios": ["1", "2", "3", "4"]
        },
        {
          "dia": "3",
          "periodo": "tarde",
          "horarios": ["1", "2", "3", "4"]
        },
        {
          "dia": "4",
          "periodo": "tarde",
          "horarios": ["1", "2", "3", "4"]
        },
        {
          "dia": "5",
          "periodo": "tarde",
          "horarios": ["1", "2", "3", "4"]
        }
      ]
    }
    var agenda_response = await AgendaRepository.cadastrarAgenda(data_agenda);
    var _medico_res = await repository.cadastrarAgendaDoMedico(medicoId, agenda_response._id);
    _email.module.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: `${data.email}`,
      replyto: process.env.EMAIL_ADDRESS,
      subject: "Boas vindas",
      text: `Olá!
        Seu acesso ao SisPoc econtra-se abaixo.
            Qualquer dúvida entrar em contato com o administrador.

              email: ${req.body.email},
              senha de acesso: ${req.body.senhaAcesso}`
    }).then(info => res.send(info)).catch(err => res.send(err));
    return res.status(201).send({
      message: "Médico cadastrado com sucesso.",
      item: {
        _id: _res._id,
        nomeCompleto: _res.nomeCompleto,
        crm: _res.crm,
        email: _res.email,
        senhaAcesso: data.senhaAcesso,
        especialidade: _res.especialidade,
        agenda: agenda_response._id
      }
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

  validation.validateNovaSenha(data);

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

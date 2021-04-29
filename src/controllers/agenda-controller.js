"use-strict";

const mongoose = require("mongoose");
const repository = require("../repositories/agenda-repository");
const medicoRepository = require("../repositories/medico-repository");

exports.CadastrarAgenda = async (req, res, next) => {
  const data = req.body;
  const medicoId = req.params.id;
  let response;

  try {
    var _medico = await medicoRepository.buscarMedicoById(medicoId);
    if (_medico.agenda != null || _medico.agenda != undefined)
      return res.status(400).send({
        message: "O médico já possui agenda.",
      });
    response = await repository.cadastrarAgenda(data);
    await medicoRepository.cadastrarAgendaDoMedico(medicoId, response._id);
    res.status(200).send({
      message: "Agenda cadastrada",
      item: response,
    });
  } catch (e) {
    res.status(500).send({
      message: "Erro ao cadastrar a agenda.",
    });
  }
};

exports.AtualizarAgenda = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  try {
    var _res = await repository.atualizarAgenda(id, data);
    res
      .status(201)
      .send({ message: "Agenda atualizada com sucesso.", item: _res });
  } catch {
    res.status(500).send({ message: "Ocorreu um erro na requisição." });
  }
};

exports.BuscarAgendaByMedico = async (req, res, next) => {
  const _medicoId = req.params.id;

  try {
    var _medico = await medicoRepository.buscarMedicoById(_medicoId);
    if (_medico == null)
      return res.status(404).send({ message: "Nenhum médico encontrado." });
    var _agendaId = _medico.agenda;
    var _agenda = await repository.buscarAgendaById(_agendaId);
    if (_agenda == null)
      return res.status(404).send({ message: "Nenhuma agenda encontrada." });
    res.status(201).send({
      message: "Sucesso",
      item: _agenda,
    });
  } catch {
    res.status(500).send({ message: "Ocorreu um erro na requisição." });
  }
};

exports.BuscarAgendaById = async (req, res, next) => {
  const _Id = req.params.id;

  try {
    var _agenda = await repository.buscarAgendaById(_Id);
    if (_agenda == null)
      return res.status(404).send({ message: "Nenhuma agenda encontrada." });
    res.status(201).send({
      message: "Sucesso",
      item: _agenda,
    });
  } catch {
    res.status(500).send({ message: "Ocorreu um erro na requisição" });
  }
};

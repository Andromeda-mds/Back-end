"use strict";

const mongoose = require("mongoose");
const consultaRepository = require("../repositories/consulta-repository");
const fichaRepository = require("../repositories/fichaPaciente-repository");
const medicoRepository = require("../repositories/medico-repository");
const agendaRepository = require("../repositories/agenda-repository");
const EDbStatusReturn = require("../Enums/EDbStatusReturn");

const Consulta = mongoose.model("Consulta");

const verificarDisponibilidadeMedico = async (_agenda, data) => {
  var horarioEstaDisponivel = false;
  var matchDiaTrabalho = 0;
  var matchDiaConsultaConcorrente = 0;
  var matchHorario = 0;
  const horariosDisponiveis = _agenda.horariosDisponiveis;
  const dataConsulta = data.data.dia.split("/");
  const _aux = new Date(dataConsulta[2], dataConsulta[1] - 1, dataConsulta[0]);
  const diaConsulta = _aux.getDay();
  horariosDisponiveis.map((item) => {
    if (
      item.dia == diaConsulta.toString() &&
      item.periodo == data.data.periodo
    ) {
      matchDiaTrabalho++;
    }

    item.horarios.map((i) => {
      if (i == data.data.horario) matchHorario++;
    });
  });
  if (matchDiaTrabalho < 1 && matchHorario < 1) return horarioEstaDisponivel;

  if (_agenda.horariosPreenchidos != null) {
    await Promise.all(
      _agenda.horariosPreenchidos.map(async (item) => {
        const _consulta = await consultaRepository.buscarConsultaById(item);
        if (_consulta == null) return;
        if (
          _consulta.data.dia == data.data.dia &&
          _consulta.data.periodo == data.data.periodo &&
          _consulta.data.horario == data.data.horario
        )
          matchDiaConsultaConcorrente++;
      })
    );
  }
  if (matchDiaConsultaConcorrente > 0) {
    return horarioEstaDisponivel;
  } else horarioEstaDisponivel = true;
  return horarioEstaDisponivel;
};

exports.CadastrarConsulta = async (req, res, next) => {
  const fichaId = req.params.id;
  const data = req.body;

  try {
    var _ficha = await fichaRepository.buscarFichaById(fichaId);
    if (_ficha == null)
      return res.status(404).send({
        message: "Ficha de paciente inválido ou inexistente.",
      });
    //verificar validade do médico
    const _medico = await medicoRepository.buscarMedicoById(data.medico);
    if (_medico == null)
      return res
        .status(404)
        .send({ message: "Médico inválido ou inexistente" });
    //verificar disponibilidade do médico
    const _agenda = await agendaRepository.buscarAgendaById(_medico.agenda);
    if (_agenda == null) {
      return res.status(404).send({ message: "O médico não possui agenda" });
    }
    const _disponivel = await verificarDisponibilidadeMedico(_agenda, data);
    if (_disponivel == false)
      return res.status(400).send({
        message: "Horário indisponível para este médico.",
        item: data.data,
      });
    var _consulta = await consultaRepository.cadastrarConsulta(data);
    await fichaRepository.adicionarConsulta(fichaId, _consulta._id);
    await agendaRepository.preencherUmHorario(_agenda._id, _consulta._id);

    res.status(201).send({
      message: "Consulta cadastrada",
      item: _consulta,
    });
  } catch (e) {
    res.status(500).send({
      message: "Ocorreu um erro com a requisição.",
    });
  }
};

exports.AtualizarConsulta = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  try {
    var _res = await consultaRepository.atualizarConsulta(id, data);
    var _consulta = await consultaRepository.buscarConsultaById(id);
    if (_res == EDbStatusReturn.DB_GENERAL_EXCEPTION)
      return res.status(500).send({
        message: "Não foi possível atualizar a consulta",
      });
    res.status(201).send({
      message: "Consulta atualizada",
      item: _consulta,
    });
  } catch {
    res.status(500).send({
      message: "Ocorreu um erro com a requisição.",
    });
  }
};

exports.BuscarConsultaById = async (req, res, next) => {
  const _id = req.params.id;

  try {
    var _consulta = await consultaRepository.buscarConsultaById(_id);
    res.status(201).send({
      message: "Sucesso",
      item: _consulta,
    });
  } catch {
    res.status(500).send({
      message: "Ocorreu uma falha na requisição",
    });
  }
};

exports.BuscarConsultaByMedico = async (req, res, next) => {
  const _medicoId = req.params.id;

  try {
    var _consultas = await consultaRepository.buscarConsultaByMedico(_medicoId);
    if (_consultas == null)
      return res.send(404).send({
        message: "Não foi encontrado nenhuma consulta para esse médico",
      });
    res.status(201).send({
      message: "Sucesso",
      items: _consultas,
    });
  } catch {
    res.status(500).send({
      message: "Ocorreu um erro na requisição",
    });
  }
};

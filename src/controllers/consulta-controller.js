"use strict";

const mongoose = require("mongoose");
const consultaRepository = require("../repositories/consulta-repository");
const fichaRepository = require("../repositories/fichaPaciente-repository");
const EDbStatusReturn = require("../Enums/EDbStatusReturn");

const Consulta = mongoose.model("Consulta");

exports.CadastrarConsulta = async (req, res, next) => {
  const fichaId = req.params.id;
  const data = req.body;

  try {
    var _consulta = await consultaRepository.cadastrarConsulta(data);
    var _res = await fichaRepository.adicionarConsulta(fichaId, _consulta._id);
    if (_res == EDbStatusReturn.DB_GENERAL_EXCEPTION)
      return _res.status(500).send({
        message: "Não foi possível cadastrar a consulta",
      });
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
    var res = await consultaRepository.atualizarConsulta(id, data);
    if (res == EDbStatusReturn.DB_GENERAL_EXCEPTION)
      return res.status(500).send({
        message: "Não foi possível cadastrar a consulta",
      });
    res.status(201).send({
      message: "Consulta cadastrada",
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

exports.BuscarConsultaByMedico = async (req, res, next) => {};

"use strict";

const mongoose = require("mongoose");
const FichaRepository = require("../repositories/fichaPaciente-repository");
const EDbStatusReturn = require("../Enums/EDbStatusReturn");
const consultaRepository = require("../repositories/consulta-repository");
const Ficha = mongoose.model("FichaPaciente");

exports.AtualizarFicha = async (req, res, next) => {
  var data = req.body;

  if (data.observacoes.length < 3)
    return res.status(400).send({
      message: "Observação deve ter, pelo menos, 3 caracteres.",
    });

  try {
    var res = await FichaRepository.atualizarFicha(data);
    if (res == EDbStatusReturn.DB_GENERAL_EXCEPTION)
      return res
        .status(500)
        .send({ message: "Não foi possível salvar as alterações" });
    res.status(201).send({
      message: "Ficha atualizada com sucesso",
      item: data,
    });
  } catch {
    res.status(500).send({
      message: "Ocorreu um erro na requisição.",
    });
  }
};

exports.BuscarFichaById = async (req, res, next) => {
  var id = req.params.id;

  if (id === null || id === undefined)
    return res.status(400).send({
      message: "Id inválido",
    });

  try {
    var data = await FichaRepository.buscarFichaById(id);
    res.status(201).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Ocorreu um erro na requisição.",
    });
  }
};

exports.BuscarFichaByPaciente = async (req, res, next) => {
  var pacienteId = req.params.id;

  if (pacienteId === null || pacienteId === undefined)
    return res.status(400).send({
      message: "Id inválido",
    });

  try {
    var data = await FichaRepository.buscarFichaByPaciente(pacienteId);
    res.status(201).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Ocorreu um erro na requisição.",
    });
  }
};

exports.ListarTodasConsultas = async (req, res, next) => {
  var id = req.params.id;

  if (id === null || id === undefined)
    return res.status(400).send({
      message: "Id inválido",
    });

  try {
    var _ficha = await FichaRepository.buscarFichaById(id);
    var _consultasId = _ficha.consultas;
    let consultas = [];
    await Promise.all(
      _consultasId.map(async (item) => {
        var aux = await consultaRepository.buscarConsultaById(item);
        var _object = {};
        if (aux == null) return;
        _object.id = aux.id;
        _object.medico = aux.medico;
        _object.data = aux.data;
        _object.exames = aux.exames;
        consultas.push(_object);
      })
    );
    res.status(201).send({
      message: "sucesso",
      item: consultas,
    });
  } catch {
    res.status(500).send({
      message: "Ocorreu um erro na requisição",
    });
  }
};

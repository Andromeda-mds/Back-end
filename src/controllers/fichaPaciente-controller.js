"use strict";

const mongoose = require("mongoose");
const FichaRepository = require("../repositories/fichaPaciente-repository");
const validation = require("../services/inputValidator");
const EResponseValidate = require("../Enums/EResponseValidate");
const Ficha = mongoose.model("FichaPaciente");

exports.AtualizarFicha = async (req, res, next) => {
  var data = req.body;

  if (data.observacoes.length < 3)
    return res.status(400).send({
      message: "Observação deve ter, pelo menos, 3 caracteres.",
    });

  try {
    await FichaRepository.atualizarFicha(data);
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

  if (id === null || id === undefined)
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

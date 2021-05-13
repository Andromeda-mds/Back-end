"use strict";

const mongoose = require("mongoose");
const _repository = require("../repositories/filaDeEspera-repository");
const _consultaRepository = require("../repositories/consulta-repository");

exports.CadastrarFilaDeEspera = async (req, res) => {
  try {
    var _res = await _repository.registrarFilaDeEspera();
    res.status(201).send({
      message: "Fila cadastrada com sucesso",
      item: _res._id,
    });
  } catch {
    res.status(500).send({
      message: "Ocorreu um erro com a requisição",
    });
  }
};

exports.AdicionarConsulta = async (req, res) => {
  var filaId = req.params.id;
  var consultaId = req.body.consultaId;

  try {
    var _consulta = await _consultaRepository.buscarConsultaById(consultaId);
    if (_consulta == null)
      return res.status(404).send({
        message: "Consulta não encontrada",
        item: consultaId,
      });
    var _res = await _repository.adicionarConsulta(consultaId, filaId);

    if (_res != null)
      return res.status(200).send({
        message: "Consulta adicionada com sucesso",
        item: _res,
      });

    res.status(404).send({
      message: "Fila de espera não encontrada",
      item: filaId,
    });
  } catch {
    res.status(500).send({
      message: "Ocorreu um erro na requisição",
    });
  }
};

exports.RemoverConsulta = async (req, res) => {
  var filaId = req.params.id;
  var consultaId = req.body.consultaId;

  try {
    var _consulta = await _consultaRepository.buscarConsultaById(consultaId);
    if (_consulta == null)
      return res.status(404).send({
        message: "Consulta não encontrada",
        item: consultaId,
      });
    var _res = await _repository.removerConsulta(consultaId, filaId);

    if (_res != null)
      return res.status(200).send({
        message: "Consulta removida com sucesso",
        item: _res,
      });

    res.status(404).send({
      message: "Fila de espera não encontrada",
      item: filaId,
    });
  } catch {
    res.status(500).send({
      message: "Ocorreu um erro na requisição",
    });
  }
};

exports.BuscarLista = async (req, res) => {
  var id = req.params.id;

  try {
    var _res = await _repository.buscarFilaById(id);
    if (_res != null) return res.status(200).send(_res);
    res.status(404).send({
      message: "Fila não encontrada",
      item: id,
    });
  } catch {
    res.status(500).send({
      message: "Ocorreu um erro com a requisição",
    });
  }
};

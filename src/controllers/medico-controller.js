"use-strict";

const mongoose = require("mongoose");
const repository = require("../repositories/medico-repository");

exports.CadastrarMedico = async (req, res, next) => {
  try {
    await repository.cadastrarMedico(req.body);
    res.status(201).send({
      message: "Médico cadastrado com sucesso.",
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha na requisição.",
    });
  }
};

exports.AtualizarMedico = (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  res.status(201).send({
    id: id,
    item: data,
  });
};

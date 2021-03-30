"use-strict";

const mongoose = require("mongoose");
const repository = require("../repositories/agenda-repository");
const medicoRepository = require("../repositories/medico-repository");

exports.CadastrarAgenda = async (req, res, next) => {
  const data = req.body;
  const medicoId = req.params.id;
  let response;

  try {
    response = await repository.cadastrarAgenda(data);
    await medicoRepository.cadastrarAgendaDoMedico(medicoId, response);
    res.status(200).send({
      message: "Agenda cadastrada",
    });
  } catch (e) {
    res.status(500).send({
      message: "Erro ao cadastrar a agenda.",
    });
  }

};

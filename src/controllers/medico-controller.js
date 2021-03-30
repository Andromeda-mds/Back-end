"use-strict";

const mongoose = require("mongoose");
const repository = require("../repositories/medico-repository");

exports.CadastrarMedico = async (req, res, next) => {
  const data = req.body;

  // Fail fast validate
  if (data.nomeCompleto.length < 3)
    return res.status(400).send({
      message: "O nome deve conter, pelo menos, 3 caracteres.",
    });

  try {
    await repository.cadastrarMedico(data);
    res.status(201).send({
      message: "Médico cadastrado com sucesso.",
      item: req.body,
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

  try{
    const data = await repository.buscarMedicoByCRM(crm);
    res.status(201).send(data);
  }catch(e){
    res.status(500).send({
      message: "Não foi possível processar a requisição."
    });
  }
}

exports.ListarMedicos = async (req, res, nex) => {
  try{
    const data = await repository.listarMedicos();
    res.status(200).send(data);
  }catch(e){
    res.status(500).send({
      message: "Ops, tivemos algum problema.\nTente novamente mais tarde"
    })
  }
}

"use strict";

const mongoose = require("mongoose");
const FilaEspera = mongoose.model("FilaEspera");

exports.registrarFilaDeEspera = async () => {
  var fila = new FilaEspera();
  var res = await fila.save();
  return res;
};

exports.adicionarConsulta = async (consultaId, filaId) => {
  var fila = await FilaEspera.findByIdAndUpdate(
    filaId,
    {
      $push: { "fila": consultaId },
    },
    { new: true }
  );
  return fila;
};

exports.removerConsulta = async (consultaId, filaId) => {
  var fila = await FilaEspera.findByIdAndUpdate(
    filaId,
    {
      $pull: { "fila": consultaId },
    },
    { new: true }
  );
  return fila;
};

exports.buscarFilaById = async (filaId) => {
  var fila = await FilaEspera.findById(filaId);
  return fila;
};

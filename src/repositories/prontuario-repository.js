"use strict";

const mongoose = require("mongoose");
const Prontuario = mongoose.model("Prontuario");

exports.cadastrarProntuario = async (data) => {
  var prontuario = new Prontuario(data);
  await prontuario.save();
};

exports.atualizarProntuario = async (data) => {};

exports.buscarProntuarioById = async (id) => {};

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  observacoes: {
    type: String,
    required: false,
  },
  prontuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prontuario",
    required: false,
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true
  }
});

module.exports = mongoose.model("FichaPaciente", schema);

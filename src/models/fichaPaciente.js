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
  },
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
  }
});

module.exports = mongoose.model("FichaPaciente", schema);

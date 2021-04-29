"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  observacoes: {
    type: String,
    required: false,
  },
  consultas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consulta",
    required: false
  }],
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paciente",
    required: true
  }
});

module.exports = mongoose.model("FichaPaciente", schema);

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  medico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medico",
    required: true,
  },
  horario: {
    type: String,
    required: true,
  },
  anamnese: {
    type: String,
    required: true,
  },
  diagnostico: {
    type: String,
    required: false,
  },
  receita: {
    type: String,
    required: false,
  },
  exames: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exame",
      required: false,
    },
  ],
});

module.exports = mongoose.model("Consulta", schema);

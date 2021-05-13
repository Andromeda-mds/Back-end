"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  medico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medico",
    required: true,
  },
  data: {
    dia: {
      type: String,
      required: true,
    },
    periodo: {
      type: String,
      required: true,
    },
    horario: {
      type: String,
      required: true,
      enum: ["1", "2", "3", "4"],
    },
  },
  anamnese: {
    type: String,
    required: false,
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
      type: String,
      required: false,
    },
  ],
});

module.exports = mongoose.model("Consulta", schema);

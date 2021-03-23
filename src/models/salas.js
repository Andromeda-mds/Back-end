"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  numSala: {
    type: Number,
    required: true,
  },
  medicos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medico",
    },
  ],
});

module.exports = mongoose.model("Salas", schema);

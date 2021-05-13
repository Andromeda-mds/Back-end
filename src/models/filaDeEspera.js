"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
   fila: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consulta",
    required: false,
  }]
});

module.exports = mongoose.model("FilaEspera", schema);

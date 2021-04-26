"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  tipoExame: {
    type: String,
    required: true,
  },
  detalhes: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Exame", schema);

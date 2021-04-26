'use strict'

const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const PessoaSchema = require("./pessoa");

const schema = extendSchema(PessoaSchema, {
  convenio: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Paciente", schema);

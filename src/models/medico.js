"use strict";

const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const PessoaSchema = require("./pessoa");

const schema = extendSchema(PessoaSchema, {
  senhaAcesso: {
    type: String,
    required: true,
  },
  crm: {
    type: String,
    required: true,
  },
  agenda: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agenda",
    required: false,
  },
});

module.exports = mongoose.model("Medico", schema);

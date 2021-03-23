"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PessoaSchema = new Schema({
  nomeCompleto: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  dataNascimento: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: false,
  },
  endereco: {
    type: String,
    required: false,
  },
});

module.exports = PessoaSchema;

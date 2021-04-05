"use strict";

const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const PessoaSchema = require("./pessoa");

const FuncionarioSchema = extendSchema(PessoaSchema, {
    senhaAcesso :{
        type: String,
        required: true
    }
});

module.exports = FuncionarioSchema;
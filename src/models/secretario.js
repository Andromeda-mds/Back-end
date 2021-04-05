"use strict";

const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const FuncionarioSchema = require("./funcionario");

const schema = extendSchema(FuncionarioSchema, {
    matricula:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Secretario", schema);
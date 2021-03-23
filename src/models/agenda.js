"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    horariosDisponiveis: [{
        dia: {
            type: String,
            required: true
        },
        periodo: {
            type: String,
            required: true
        },
        horario: {
            type: String,
            required: true,
            enum: ['1', '2', '3', '4']
        }
    }]
});

module.exports = mongoose.model("Agenda", schema);

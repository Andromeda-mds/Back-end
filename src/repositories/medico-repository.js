"use-strict";

const mongoose = require("mongoose");
const Medico = mongoose.model("Medico");


exports.cadastrarMedico = async (data) => {
    var medico = new Medico(data);
    await medico.save();
}
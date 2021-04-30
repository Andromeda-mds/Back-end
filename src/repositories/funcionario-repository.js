
const mongoose = require("mongoose");
const Medico = mongoose.model("Medico");
const Secretario = mongoose.model("Secretario");

exports.cadastrarFuncionario = async (data, typeUser) => {
    var funcionario = typeUser == Secretario ? new Secretario(data) : new Medico(data);
    var res = await funcionario.save();
    return res;
};
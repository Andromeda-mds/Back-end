"use strict";

const mongoose = require("mongoose");
const consultaRepository = require("../repositories/consulta-repository");
const fichaRepository = require("../repositories/fichaPaciente-repository");
const validation = require("../services/inputValidator");
const EResponseValidate = require("../Enums/EResponseValidate");
const Consulta = mongoose.model("Consulta");

exports.CadastrarConsulta = async (req, res, next) => {
    const fichaId = req.params.id;
    const data = req.body;
    
    try
    {
        var _consulta = await consultaRepository.cadastrarConsulta(data);
        await fichaRepository.adicionarConsulta(fichaId, _consulta._id);
        res.status(201).send({
            message: "Consulta cadastrada",
            item: _consulta
        });
    }
    catch
    {
        res.status(500).send({
            message: "Ocorreu um erro com a requisição."
        })
    }
};

exports.AtualizarConsulta = async (req, res, next) => {};

exports.BuscarConsultaById = async (req, res, next) => {};

exports.BuscarConsultaByMedico = async (req, res, next) => {};

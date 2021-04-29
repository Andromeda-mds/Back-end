"use strict";

require("dotenv").config();
const express = require("express");
const mongoClient = require("mongoose");
const cors = require("cors");
const app = express();

global.SALT_KEY = process.env.SALT_KEY;

// conectando com o DB
const uri = process.env.MONGO_URL;

const connectDB = async () => {
  await mongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("DB connected.");
};
connectDB();
// carregando models
const consultorio = require("./models/consultorio");
const medico = require("./models/medico");
const agenda = require("./models/agenda");
const secretario = require("./models/secretario");
const paciente = require("./models/paciente");
const fichaPaciente = require("./models/fichaPaciente");
const consulta = require("./models/consulta");
// carregando rotas
const indexRoute = require("./routes/index-route");
const consultorioRoute = require("./routes/consultorio-route");
const medicoRoute = require("./routes/medico-route");
const agendaRoute = require("./routes/agenda-route");
const secretarioRoute = require("./routes/secretario-route");
const pacienteRoute = require("./routes/paciente-route");
const consultaRoute = require("./routes/consultas-route");
const fichaRoute = require("./routes/fichaPaciente-route");

//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cors
app.use(cors());

// Rotas
app.use("/", indexRoute);
app.use("/consultorio", consultorioRoute);
app.use("/medico", medicoRoute);
app.use("/agenda", agendaRoute);
app.use("/secretario", secretarioRoute);
app.use("/paciente", pacienteRoute);
app.use("/consulta", consultaRoute);
app.use("/ficha", fichaRoute);

module.exports = app;

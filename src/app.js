"use strict";

require("dotenv").config();
const express = require("express");
const mongoClient = require("mongoose");
const cors = require("cors");

const app = express();

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
// carregando rotas
const indexRoute = require("./routes/index-route");
const consultorioRoute = require("./routes/consultorio-route");
const medicoRoute = require("./routes/medico-route");
const agendaRoute = require("./routes/agenda-route");

//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cors
app.use(cors());

if (process.env.NODE_ENV === "production") {
  // app.use(express.static("client/build"));
  app.use("Back-end", express.static("src/app.js"));
  
}

// Rotas
app.use(express.static("v1/", indexRoute));
app.use("v1/consultorio", consultorioRoute);
app.use("v1/medico", medicoRoute);
app.use("v1/agenda", agendaRoute);

module.exports = app;

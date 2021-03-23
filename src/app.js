"use strict";

const express = require("express");
const mongoClient = require("mongoose");

const app = express();

// conectando com o DB
const uri =
  "mongodb+srv://Victor:ztzz1517@cluster0.f432g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("DB connected.");
};
// carregando models
const consultorio = require("./models/consultorio");
const medico = require('./models/medico');
// carregando rotas
const indexRoute = require("./routes/index-route");
const consultorioRoute = require("./routes/consultorio-route");
const medicoRoute = require("./routes/medico-route");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


connectDB();

// Rotas
app.use("/", indexRoute);
app.use("/consultorio", consultorioRoute);
app.use("/medico", medicoRoute);

module.exports = app;

"use strict";

require("dotenv").config();
const express = require("express");
const mongoClient = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

global.SALT_KEY=process.env.SALT_KEY;

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
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Header',
//     'Origin, Content-Type, Accept'
//   );
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).send({});
//   }
// })

//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//cors
app.use(cors());

// if (process.env.NODE_ENV === "production") {
//   // app.use(express.static("client/build"));
//   app.use("Back-end", express.static("src/app"));

// }
// app.use(express.static(path.join(__dirname, "build")));

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname + "/build/index.html"));
// });

// Rotas
app.use("/", indexRoute);
app.use("/consultorio",consultorioRoute);
app.use("/medico",medicoRoute);
app.use("/agenda",agendaRoute);

module.exports = app;

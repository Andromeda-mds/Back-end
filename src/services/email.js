var nodemailer = require("nodemailer");

const remetente = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "sispoc.mds@gmail.com",
        pass: "sispoc2021"
    }
});
exports.module = remetente;
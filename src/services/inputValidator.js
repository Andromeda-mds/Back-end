"use strict";

const EResponseValidate = require("../Enums/EResponseValidate");

exports.validateNomeCompleto = (data) => {
  if (data.nomeCompleto.length >= 3) return EResponseValidate.valid;
  return EResponseValidate.invalid;
};

exports.validateCRM = (data) => {
  if (isNaN(parseInt(data.crm)) == false || data.crm.length >= 6)
    return EResponseValidate.valid;
  return EResponseValidate.invalid;
};

exports.validateEmail = (data) => {
  const re = /\S+@\S+\.\S+/;

  if (re.test(data.email)) return EResponseValidate.valid;

  return EResponseValidate.invalid;
};

exports.validateCPF = (data, res) => {
  var soma = 0;
  var resto;
  var inputCPF = data.cpf;
  var listIsNotValid = [];

  if (inputCPF == "00000000000") listIsNotValid.push(1);
  for (let i = 1; i <= 9; i++)
    soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(inputCPF.substring(9, 10))) listIsNotValid.push(1);

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;

  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(inputCPF.substring(10, 11))) listIsNotValid.push(1);

  if (listIsNotValid.length == 0) return EResponseValidate.valid;

  return EResponseValidate.invalid;
};

exports.validateNovaSenha = (data) => {
  if (data.senhaAcesso >= 5) return EResponseValidate.Responses.valid;
  return EResponseValidate.invalid;
};

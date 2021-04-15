"use strict";

exports.validateNomeCompleto = function (data){
    if (data.nomeCompleto.length < 3)
      return res.status(400).send({
        message: "O nome deve conter, pelo menos, 3 caracteres.",
      });
}

exports.validateCRM = function (data){
    if (parseInt(data.crm) == isNaN || (data.crm.length < 6)){
        return res.status(400).send({
          message: "O CRM deve conter apenas números de, pelo menos, 6 digitos."
        })
    }
}

exports.validateEmail = function (data){
    const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i
    
    if(re.test(data.email) == 'false'){
      return res.status(400).send({
        message: "Email inválido."
      })
    }
}

exports.validateCPF = function (data){
    var soma = 0;
    var resto;
    var inputCPF = data.cpf

    if(inputCPF == '00000000000') return res.status(400).send({
      message: "CPF inválido."
    });
    for(i=1; i<=9; i++) soma = soma + parseInt(inputCPF.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)) resto = 0;
    if(resto != parseInt(inputCPF.substring(9, 10))) return res.status(400).send({
      message: "CPF inválido."
    });

    soma = 0;
    for(i = 1; i <= 10; i++) soma = soma + parseInt(inputCPF.substring(i-1, i))*(12-i);
    resto = (soma * 10) % 11;

    if((resto == 10) || (resto == 11)) resto = 0;
    if(resto != parseInt(inputCPF.substring(10, 11))) return res.status(400).send({
      message: "CPF inválido."
    });
}

exports.validateNovaSenha = function (data){
    if (data.senhaAcesso < 5)
      return res.status(400).send({
        message: "A senha deve conter, pelo menos, 5 caracteres.",
      });
}
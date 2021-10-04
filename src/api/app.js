const express = require("express");
const users = require("../controllers/users");
const routes = require("../router");
const path = require('path');


const app = express();

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

// Colocaria a chave em uma variável de ambiente, 
// está aqui pois foi pedido para não usar no env
global.tokenKey = "485ad2831bd193414c07447456a85750";

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get("/", (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(routes);

module.exports = app;

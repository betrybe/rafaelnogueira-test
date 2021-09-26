const express = require("express");
const users = require("../controllers/users");
const routes = require("../router");

const app = express();

app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get("/", (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(routes);

module.exports = app;

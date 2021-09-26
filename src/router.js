const { store } = require("./controllers/users");
const usersCtrl = require("./controllers/users");
const usersValidator = require("./validators/users");

const routes = require("express").Router();

routes.post("/users", usersValidator.store, usersCtrl.store);

module.exports = routes;

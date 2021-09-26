const usersCtrl = require("./controllers/users");
const sessionsCtrl = require("./controllers/sesions");
const recipesCtrl = require("./controllers/recipes");

const usersValidator = require("./validators/users");
const sessionsValidator = require("./validators/sessions");
const recipesValidator = require("./validators/recipes");

const authorization = require("./middlewares/authorization");

const routes = require("express").Router();

routes.post("/users", usersValidator.store, usersCtrl.store);

routes.post("/login", sessionsValidator.store, sessionsCtrl.store);

routes.get("/recipes", recipesCtrl.index);

routes.get("/recipes/:id", recipesCtrl.find);

routes.use(authorization);

routes.post("/recipes", recipesValidator.store, recipesCtrl.store);

module.exports = routes;

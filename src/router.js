const usersCtrl = require("./controllers/users");
const usersAdminCtrl = require("./controllers/usersAdmin");
const sessionsCtrl = require("./controllers/sesions");
const recipesCtrl = require("./controllers/recipes");
const recipeImagesCtrl = require("./controllers/recipeImages");

const usersValidator = require("./validators/users");
const sessionsValidator = require("./validators/sessions");
const recipesValidator = require("./validators/recipes");

const authorization = require("./middlewares/authorization");
const uploadSingleImage = require("./middlewares/uploadSingleImage");

const routes = require("express").Router();

routes.post("/users", usersValidator.store, usersCtrl.store);

routes.post("/users/admin", authorization, usersValidator.store, usersAdminCtrl.store);

routes.post("/login", sessionsValidator.store, sessionsCtrl.store);

routes.get("/recipes", recipesCtrl.index);

routes.get("/recipes/:id", recipesCtrl.find);

routes.post(
  "/recipes",
  recipesValidator.store,
  authorization,
  recipesCtrl.store
);

routes.put("/recipes/:id", authorization, recipesCtrl.update);

routes.delete("/recipes/:id", authorization, recipesCtrl.delete);

routes.put(
  "/recipes/:id/image",
  uploadSingleImage,
  authorization,
  recipeImagesCtrl.update
);

module.exports = routes;

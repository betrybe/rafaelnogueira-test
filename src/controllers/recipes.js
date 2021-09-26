const Recipe = require("../model/Recipe");

module.exports = {
  async store(req, res) {
    let { name, ingredients, preparation } = req.body;

    let { jwtUser } = req;

    try {
      let recipe = await Recipe.build({
        name,
        ingredients,
        preparation,
        userId: jwtUser._id,
      });

      await recipe.insert();

      res.status(201).send({ recipe: recipe.getRecipe() });
    } catch (error) {
      res.status(500).send({ error: "Internal error" });
    }
  },
};

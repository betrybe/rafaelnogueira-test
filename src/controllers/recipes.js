const Recipe = require("../model/Recipe");

module.exports = {
  async index(req, res) {
    try {
      let recipes = await Recipe.findAll();

      res.status(200).send(recipes);
    } catch (error) {
      res.status(500).send({ error: "Internal error" });
    }
  },

  async find(req, res) {
    const { id } = req.params;

    try {
      let recipe = await Recipe.findById(id);

      if (!recipe) return res.status(404).send({ message: "recipe not found" });

      res.status(200).send(recipe.getRecipe());
    } catch (error) {
      res.status(500).send({ error: "Internal error" });
    }
  },

  async store(req, res) {
    let { name, ingredients, preparation } = req.body;

    let { jwtUser } = req;

    console.log(jwtUser)
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
      console.log(error);
      res.status(500).send({ error: "Internal error" });
    }
  },

  async update(req, res) {
    let { name, ingredients, preparation } = req.body;
    const { id } = req.params;

    let { jwtUser } = req;

    try {
      let recipe = await Recipe.findById(id);

      if (!recipe) return res.status(404).send({ message: "not found" });

      if (recipe.userId !== jwtUser._id && jwtUser.role !== "admin")
        return res.status(403).send({ message: "access defined" });

      recipe.name = name;
      recipe.ingredients = ingredients;
      recipe.preparation = preparation;

      await recipe.save();

      res.status(200).send(recipe.getRecipe());
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal error" });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    let { jwtUser } = req;

    try {
      let recipe = await Recipe.findById(id);

      if (!recipe) return res.status(404).send({ message: "not found" });

      if (recipe.userId !== jwtUser._id && jwtUser.role !== "admin")
        return res.status(403).send({ message: "access defined" });

      await recipe.destroy();

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal error" });
    }
  },
};

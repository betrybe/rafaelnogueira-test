const Recipe = require("../model/Recipe");

module.exports = {
  async update(req, res) {
    const { id } = req.params;

    let { jwtUser } = req;

    try {
      let recipe = await Recipe.findById(id);

      if (!recipe) return res.status(404).send({ message: "not found" });

      if (recipe.userId !== jwtUser._id && jwtUser.role !== "admin")
        return res.status(403).send({ message: "access defined" });

      recipe.image = "localhost:3000/src/uploads/" + req.file.filename;

      await recipe.save();

      res.status(200).send(recipe.getRecipe());
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal error" });
    }
  },
};

const Database = require("../database/db");

class Recipe {
  db;
  name;
  ingredients;
  preparation;
  userId;

  constructor({ name, ingredients, preparation, userId }, db) {
    this.db = db;
    this.name = name;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.userId = userId;
  }

  static async build(recipe = {}) {
    let db = await Database.getDatabase();

    return new Recipe(recipe, db);
  }

  async insert() {
    try {
      let result = await this.db.collection("recipes").insertOne({
        name: this.name,
        ingredients: this.ingredients,
        preparation: this.preparation,
        userId: this.userId,
      });

      let [recipe] = result.ops;

      this._id = recipe._id;
    } catch (error) {
      console.log(error);
    }
  }

  getRecipe() {
    return {
      _id: this._id,
      name: this.name,
      ingredients: this.ingredients,
      preparation: this.preparation,
      userId: this.userId,
    };
  }
}

module.exports = Recipe;

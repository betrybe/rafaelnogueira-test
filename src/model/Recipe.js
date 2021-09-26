const Database = require("../database/db");
const { ObjectId } = require("mongodb");

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

  static async findAll() {
    let db = await Database.getDatabase();

    let recipes = await db.collection("recipes").find({}).toArray();

    return recipes;
  }

  static async findById(id) {
    try {
      let db = await Database.getDatabase();

      let recipe = await db.collection("recipes").findOne(ObjectId(id));

      return recipe;
    } catch (error) {
      console.error(error);
    }
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

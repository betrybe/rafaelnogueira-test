const Database = require("../database/db");
const { ObjectId } = require("mongodb");

class Recipe {
  db;
  _id;
  name;
  ingredients;
  preparation;
  userId;
  image;

  constructor({ _id = undefined, name, ingredients, preparation, userId }, db) {
    this.db = db;
    this._id = _id;
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

  async save() {
    try {
      let result = await this.db.collection("recipes").updateOne(
        { _id: ObjectId(this._id) },
        {
          $set: {
            name: this.name,
            ingredients: this.ingredients,
            preparation: this.preparation,
            userId: this.userId,
            image: this.image,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  async destroy() {
    try {
      await this.db
        .collection("recipes")
        .deleteOne({ _id: ObjectId(this._id) });
    } catch (error) {
      console.error(error);
    }
  }

  static async findById(id) {
    try {
      let db = await Database.getDatabase();

      let recipe = await db.collection("recipes").findOne(ObjectId(id));

      if (!recipe) return null;

      return new Recipe(
        {
          _id: recipe._id,
          name: recipe.name,
          ingredients: recipe.ingredients,
          preparation: recipe.preparation,
          userId: recipe.userId,
        },
        db
      );
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
      console.error(error);
    }
  }

  getRecipe() {
    return {
      _id: this._id,
      name: this.name,
      ingredients: this.ingredients,
      preparation: this.preparation,
      userId: this.userId,
      image: this.image,
    };
  }
}

module.exports = Recipe;

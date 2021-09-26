const Database = require("../database/db");

class User {
  db;
  name;
  email;
  password;
  role;

  constructor({ name, email, password, role }, db) {
    this.db = db;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static async build(user = {}) {
    let db = await Database.getDatabase();

    return new User(user, db);
  }

  static async findByEmail(email) {
    let db = await Database.getDatabase();

    let user = await db.collection("users").findOne({ email });

    return user;
  }

  async insert() {
    try {
      let result = await this.db.collection("users").insertOne({
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
      });

      let [user] = result.ops;

      this._id = user._id;
    } catch (error) {
      console.log(error);
    }
  }

  getUser() {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role
    };
  }
}

module.exports = User;

const { MongoClient } = require("mongodb");

const URL = "mongodb://localhost:27017/Cookmaster";
const defaultDBName = "Cookmaster";

class Database {
  db;

  static async getDatabase() {
    if (!this.db) {
      let client = new MongoClient(URL, { useUnifiedTopology: true });
      let conn = await client.connect();
      this.db = conn.db(defaultDBName);

      let users = await this.db.createCollection("users");

      users.createIndex("email", { unique: true });
    }

    return this.db;
  }
}

module.exports = Database;

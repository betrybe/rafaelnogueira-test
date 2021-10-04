const Database = require('./src/database/db');

const makeSeedAdmin = async () => {
  let db = await Database.getDatabase();

  db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
};

makeSeedAdmin();
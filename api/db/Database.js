const mongoose = require("mongoose");
let instance = null;
class Database {
  constructor() {
    if (!instance) {
      this.mongooseConnection = null;
      instance = this;
    }

    return instance;
  }

  async connect(options) {
    try {
      let db = await mongoose.connect(options.DB_CONNECTION_STRING);

      this.mongooseConnection = db;
    } catch (err) {
      process.exit(1);
    }
  }
}

module.exports = Database;

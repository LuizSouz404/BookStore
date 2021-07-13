const Database = require("./config");

const initDB = {
  async init() {
    const db = await Database();

    await db.exec(`CREATE TABLE books (
      id TEXT PRIMARY KEY,
      title TEXT,
      author TEXT,
      cover TEXT,
      synopsis TEXT
    )`);

    await db.close();
  }
}

initDB.init();

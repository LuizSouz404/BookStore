const {v4: uuid} = require("uuid");
const Database = require("../database/config");

module.exports = {
  async create(request, response) {
    const db = await Database();
    const { title, author, cover, synopsis } = request.body;

    const id = uuid();

    await db.run(`INSERT INTO books (
      id,
      title,
      author,
      cover,
      synopsis
    ) VALUES (
      "${id}",
      "${title}",
      "${author}",
      "${cover}",
      "${synopsis}"
    )`);

    await db.close();

    return response.status(200).json({
      message: `O livro ${title} foi cadastrado com sucesso!`
    })
  }
};

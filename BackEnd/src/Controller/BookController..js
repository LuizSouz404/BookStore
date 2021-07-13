const {v4: uuid} = require("uuid");
const Database = require("../database/config");


module.exports = {
  async create(request, response) {
    const db = await Database();
    const { title, author, cover, synopsis } = request.body;

    const id = uuid();

    await db.run(`INSERT INTO books (
      id, title, author, cover, synopsis
    ) VALUES (
      "${id}", "${title}", "${author}", "${cover}", "${synopsis}"
    )`);

    await db.close();

    return response.status(200).json({
      message: `O livro ${title} foi cadastrado com sucesso!`
    })
  },
  
  async open(request, response) {
    const db = await Database();
    const book = await db.all(`SELECT * FROM books`);

    const bookPage = book.splice(0, 6);

    bookPage.forEach(book => {
      book.id = `${book.title.replace(/\s+/g, '-').toLowerCase()}-${book.author.replace(/\.\s+/g, '-').toLowerCase()}`;
    })

    await db.close();

    return response.render("tes", {books: bookPage})
  }
};

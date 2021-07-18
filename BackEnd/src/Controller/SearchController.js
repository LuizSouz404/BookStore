const Database = require("../database/config");

module.exports = {
  async open(request, response) {
    const db = await Database();
    const search = request.query.search;

    const book = await db.all(`SELECT * FROM books WHERE author="${search}" OR title="${search}"`);
    const category = await db.all(`SELECT description FROM categories`);

    const bookPage = book.splice(0, 6);

    await db.close();

    return response.render("index", {books: bookPage, categories: category})
  },

  async show(request, response) {
    const db = await Database();
    const category = request.params.category;

    /*const categoryID = await db.all(`SELECT key FROM categories WHERE description="${category}"`);*/
    const categoriesAvailable = await db.all(`SELECT * FROM categories`);
    const index = categoriesAvailable.map(c => c.description).indexOf(category);
    const book = await db.all(`SELECT * FROM books WHERE categoryID="${categoriesAvailable[index].key}"`);

    const bookPage = book.splice(0, 6);

    await db.close();

    return response.render("index", {books: bookPage, categories: categoriesAvailable})
  }
}
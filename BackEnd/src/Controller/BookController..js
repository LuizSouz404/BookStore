const Database = require("../database/config");


module.exports = {
  async create(request, response) {
    const db = await Database();
    const books = request.body;

    for(let i=0; books.length > i; i++) {
      const category = `${books[i].categoryID.replace(/\s+/g, '-').replace(/\.\s+/g, '-').toLowerCase()}`;
  
      const id = `${books[i].title.replace(/\s+/g, '-').toLowerCase()}-${books[i].author.replace(/\.\s+/g, '-').replace(/\s+/g, '-').replace(/\.+/g, '-').toLowerCase()}`;
      const [categoryExists, ] = await db.all(`SELECT * FROM categories WHERE description="${category}"`);
  
      if (categoryExists) {
        await db.run(`INSERT INTO books (
          id, title, author, cover, synopsis, url, categoryID
        ) VALUES (
          "${id}", "${books[i].title}", "${books[i].author}", "${books[i].cover}", "${books[i].synopsis}", "${books[i].url}", "${categoryExists.key}"
        )`);  
      } else {
        const data = await db.run(`INSERT INTO categories (
          description
        ) VALUES (
          "${category}"
        )`)
    
        await db.run(`INSERT INTO books (
          id, title, author, cover, synopsis, url, categoryID
        ) VALUES (
          "${id}", "${books[i].title}", "${books[i].author}", "${books[i].cover}", "${books[i].synopsis}", "${books[i].url}", "${data.lastID}"
        )`);  
      }
    }
    await db.close();

    return response.status(200).json({
      message: `O livro foi cadastrado com sucesso!`
    })
  },
  
  async open(request, response) {
    const db = await Database();
    const book = await db.all(`SELECT * FROM books`);
    const category = await db.all(`SELECT description FROM categories`);

    const bookPage = book.splice(0,);

    await db.close();

    return response.render("index", {books: bookPage, categories: category})
  },

  async show(request, response) {
    const db = await Database();
    const id = request.params.id;
    
    const book = await db.all(`SELECT * FROM books WHERE id="${id}"`);
    const sameAuthor = await db.all(`SELECT * FROM books WHERE author="${book[0].author}" AND NOT title="${book[0].title}"`);
    const category = await db.all(`SELECT description FROM categories`);

    console.log(sameAuthor);
    
    await db.close();

    return response.render("details", {books: book, categories: category, sameAuthor: sameAuthor})
  }
};

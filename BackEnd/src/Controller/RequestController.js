module.exports = {
  index(request, response) {
    const {title, author} = request.body;

    console.log(`Autor = ${author}, Titulo do Livro = ${title}`);
  }
} 
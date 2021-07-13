const Database = require('../database/config');

module.exports = {
  async index(request, response) {
    const db = await Database();
    const {title, author} = request.body;

    await db.run(`INSERT INTO requests (
      title, author
    ) VALUES (
      "${title}", "${author}"
    )`);

    await db.close();

    return response.status(200).redirect('..').json({
      message: `Você requisitou com sucesso o Livro ${title} de ${author}, retornaremos o mais prevê possível!`
    })
  }
} 
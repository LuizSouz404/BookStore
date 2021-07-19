const path = require('path');
const sendMailRequest = require('../service/sendMailRequest');

module.exports = {
  async index(request, response) {
    const {title, author} = request.body;

    const requestPath = path.resolve(
      __dirname,
      '..',
      'views',
      'emails',
      'requestBook.hbs'
    );

    const variables = {
      title,
      author,
      date: Date().slice(0,21)
    };

    await sendMailRequest(
      'equipe.LivroLivre@gmail.com',
      `Requisição do livro ${title}`,
      variables,
      requestPath
    );

    return response.status(200).redirect('..')
  }
} 
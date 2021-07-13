const express = require('express');
const BookController = require('./Controller/BookController.');
const RequestController = require('./Controller/RequestController');

const routes = express.Router();

routes.get('/', (request, response) => response.render('index'));

// POST Request
routes.post('/request', RequestController.index);

//POST BOOK
routes.post('/book', BookController.create);

module.exports = routes;
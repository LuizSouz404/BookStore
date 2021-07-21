const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const BookController = require('./Controller/BookController');
const RequestController = require('./Controller/RequestController');
const SearchController = require('./Controller/SearchController');

const routes = express.Router();

// GET INICIAL -> PAGINA INICIAL
routes.get('/', BookController.open);
// GET DETALHES -> PAGINA DE DETALHES DO LIVRO
routes.get('/book/:id', BookController.show);

// GET CATEGORY -> PROCURAR LIVRO POR GENERO
routes.get('/category/:category', SearchController.show);

// POST SEARCH -> PROCURAR LIVRO NA BARRA DE PESQUISA
routes.get('/book', SearchController.open);

// POST REQUEST -> REQUISITAR UM LIVRO
routes.post('/request', RequestController.index);

//POST BOOK -> CRIAR LIVRO NO BD
routes.post('/book', BookController.create);

module.exports = routes;
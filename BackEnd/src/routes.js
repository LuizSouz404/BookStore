const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => response.render('index'));

module.exports = routes;
const express = require('express');
const routes = require('./routes');
const path = require('path');

const server = express();

server.use(express.static("public"));

server.set('view engine', 'ejs');

server.set('views', path.join(__dirname, 'views'));

server.use(express.urlencoded({extended: true}));

server.use(express.json());

server.use(routes);

server.listen(3333, () => {
  console.log("Server is running on Port 3333!")
})
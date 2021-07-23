const express = require('express');
const routes = require('./routes');
const path = require('path');
const uploadConfig = require('./config/upload');

const server = express();

server.use(express.static("public"));

server.use('/images', express.static(uploadConfig.directory));

server.set('view engine', 'ejs');

server.set('views', path.join(__dirname, 'views'));

server.use(express.urlencoded({extended: true}));

server.use(express.json());

server.use(routes);

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on Port 3333 or on port ${process.env.PORT}`)
})
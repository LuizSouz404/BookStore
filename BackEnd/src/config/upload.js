const multer = require('multer');
const path = require('path');

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

module.exports = {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, files, callback) {
      const id = `${request.body.title.replace(/\s+/g, '-').toLowerCase()}-${request.body.author.replace(/\.\s+/g, '-').replace(/\s+/g, '-').replace(/\.+/g, '-').toLowerCase()}`;
      const fileName = `${id}.jpg`;

      return callback(null, fileName);
    }
  })
}
const database = require('../db');
const rootDirectory = require('path').resolve('./');

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, path.resolve(rootDirectory + '/media/'))
    },
  
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },

  });
  
const uploadImage = multer({storage: storage});

// =========== GET ROUTES ===========
const getImageFile = async (request, response) => {
    const { id } = request.params;
    const { rows, rowCount } = await database().query('SELECT file FROM artworks WHERE id=$1', [id]);
    if (rowCount === 0) return response.sendStatus(404);
    const filename = rows[0].file;

    response.set('Content-Type', 'image/jpg');
    response.sendFile(rootDirectory + '/media/' + filename);
};

module.exports = {
    getImageFile,
    uploadImage
}
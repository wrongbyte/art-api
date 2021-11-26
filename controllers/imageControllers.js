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
const upload = multer({storage: storage}).single('image');

// =========== GET ROUTES ===========
const getImageFile = async (request, response) => {
    const { id } = request.params;
    const { rows, rowCount } = await database().query('SELECT file FROM artworks WHERE id=$1', [id]);
    if (rowCount === 0) return response.sendStatus(404);
    const filename = rows[0].file;

    response.set('Content-Type', 'image/jpg');
    response.sendFile(rootDirectory + '/media/' + filename);
};

// POST ROUTE TO POST ARTWORK + IMAGE SIMULTANEOUSLY
const postArtworkData = (request, response, next) => {
    uploadImage.single('file')(request, response, () => {
      console.log(request.body);
      next()
    })
}

const handle = (request, response) => {
    console.log('finished');
    response.sendStatus(200);
}

module.exports = {
    getImageFile,
    postArtworkData,
    handle
}
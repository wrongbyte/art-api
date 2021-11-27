const multer = require('multer');
const path = require('path');
const rootDirectory = path.resolve('../');
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, path.resolve(rootDirectory + '/media/'))
    },
  
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },

  });
  
const uploadImage = multer({storage: storage});

module.exports = uploadImage;
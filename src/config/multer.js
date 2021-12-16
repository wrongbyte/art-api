const multer = require('multer');  
const { BadRequestError } = require('../utils/errors');
const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new BadRequestError('Format not allowed. Please submit a png, jpg or jpeg file.'));
    }
  }
});

module.exports = uploadImage;
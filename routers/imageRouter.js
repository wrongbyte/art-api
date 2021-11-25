const express = require('express');
const { getImageFile, uploadImage } = require('../controllers/imageControllers');

const getImageRouter = () => {
    const imageRouter = express.Router();
    
    imageRouter.get('/:id', getImageFile);

    // This route is handled differently because of https://github.com/expressjs/multer/issues/391
    imageRouter.post('/:id/post', uploadImage.single('image'), (req, res) => {
        res.sendStatus(200)
    })

    return imageRouter;
}

module.exports = getImageRouter;
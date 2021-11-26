const express = require('express');
const { getImageFile, postArtworkData, handle } = require('../controllers/imageControllers');

const getImageRouter = () => {
    const imageRouter = express.Router();
    imageRouter.get('/:id', getImageFile);

    imageRouter.post('/post', postArtworkData, handle);

    return imageRouter;
}

module.exports = getImageRouter;
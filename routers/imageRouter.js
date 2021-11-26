const express = require('express');
const { getImageFile } = require('../controllers/imageControllers');

const getImageRouter = () => {
    const imageRouter = express.Router();
    imageRouter.get('/:id', getImageFile);

    return imageRouter;
}

module.exports = getImageRouter;
const express = require('express');
const { getImageFile } = require('../controllers/imageControllers');

// only GET because POST is handled along with artwork data in artwork routes
const getImageRouter = () => {
    const imageRouter = express.Router();
    imageRouter.get('/:id(\\d+)', getImageFile);

    return imageRouter;
}

module.exports = getImageRouter;
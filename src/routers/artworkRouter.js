const express = require('express');
const { getArtworks, getArtworkById, getPeriodsOfArtwork, updateArtwork, putPeriodInArtwork, postArtwork, deleteArtwork , deletePeriodFromArtwork } = require('../controllers/artworkControllers');
const uploadImage = require('../config/multer');

const getArtworkRouter = () => {
    artworkRouter = express.Router();

    artworkRouter.use(uploadImage.single('file'));

    artworkRouter.get('/', getArtworks);
    artworkRouter.get('/:id(\\d+)', getArtworkById);
    artworkRouter.get('/:id(\\d+)/periods', getPeriodsOfArtwork);

    artworkRouter.put('/:id(\\d+)', updateArtwork);
    artworkRouter.put('/:artwork_id(\\d+)/periods/:period_id(\\d+)', putPeriodInArtwork);

    artworkRouter.post('/', postArtwork); // must be multipart/form-data

    artworkRouter.delete('/:id(\\d+)', deleteArtwork);
    artworkRouter.delete('/:artwork_id(\\d+)/periods/:period_id(\\d+)', deletePeriodFromArtwork);

    return artworkRouter;
};
module.exports = getArtworkRouter;



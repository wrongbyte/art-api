const express = require('express');
const { getArtworks, getArtworkById, getPeriodsOfArtwork, updateArtwork, putPeriodInArtwork, postArtwork, deleteArtwork , deletePeriodFromArtwork } = require('../controllers/artworkControllers');
const uploadImage = require('../config/multer');

const getArtworkRouter = () => {
    artworkRouter = express.Router();

    artworkRouter.use(uploadImage.single('file'));

    artworkRouter.get('/', getArtworks);
    artworkRouter.get('/:id', getArtworkById);
    artworkRouter.get('/:id/periods', getPeriodsOfArtwork);

    artworkRouter.put('/:id', updateArtwork);
    artworkRouter.put('/:artwork_id/periods/:period_id', putPeriodInArtwork);

    artworkRouter.post('/', postArtwork); // must be multipart/form-data

    artworkRouter.delete('/:id', deleteArtwork);
    artworkRouter.delete('/:artwork_id/periods/:period_id', deletePeriodFromArtwork);

    return artworkRouter;
};
module.exports = getArtworkRouter;



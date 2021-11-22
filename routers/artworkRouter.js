const express = require('express');
const { getArtworks, getArtworkById, getPeriodsOfArtwork, updateArtwork, putPeriodInArtwork, postArtwork } = require('../controllers/artworkControllers');

const getArtworkRouter = () => {
    artworkRouter = express.Router();

    artworkRouter.get('/', getArtworks);
    artworkRouter.get('/:id', getArtworkById);
    artworkRouter.get('/:id/periods', getPeriodsOfArtwork);

    artworkRouter.put('/:id', updateArtwork);
    artworkRouter.put('/:artwork_id/periods/:period_id', putPeriodInArtwork);

    artworkRouter.post('/', postArtwork);

    return artworkRouter;
};
module.exports = getArtworkRouter;



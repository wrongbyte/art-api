const express = require('express');
const { getPeriods, getArtworksOfPeriod, postPeriod, updatePeriod } = require('../controllers/periodControllers')

const getPeriodRouter = () => {
    const periodRouter = express.Router();

    periodRouter.get('/', getPeriods);
    periodRouter.get('/:id(\\d+)/artworks', getArtworksOfPeriod);

    periodRouter.put('/', updatePeriod);

    periodRouter.post('/', postPeriod);

    return periodRouter;
};

module.exports = getPeriodRouter;
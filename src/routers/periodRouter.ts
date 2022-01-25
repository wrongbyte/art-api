import express from 'express';
import { getPeriods, getArtworksOfPeriod, postPeriod, updatePeriod } from '../controllers/periodControllers';

const getPeriodRouter = () => {
    const periodRouter = express.Router();

    periodRouter.get('/', getPeriods);
    periodRouter.get('/:id(\\d+)/artworks', getArtworksOfPeriod);

    periodRouter.put('/:id(\\d+)', updatePeriod);

    periodRouter.post('/', postPeriod);

    return periodRouter;
};

export default getPeriodRouter;
import express from 'express';
import { getImageFile } from '../controllers/imageControllers.js';

// only GET because POST is handled along with artwork data in artwork routes
const getImageRouter = () => {
    const imageRouter = express.Router();
    imageRouter.get('/:id(\\d+)', getImageFile);

    return imageRouter;
}

export default getImageRouter;
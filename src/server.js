import express from 'express';
import getArtworkRouter from './routers/artworkRouter.js';
import getPeriodRouter from './routers/periodRouter.js';
import getImageRouter from './routers/imageRouter.js';
import errorMiddleware from './middlewares/error-middleware.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/artwork', getArtworkRouter());
app.use('/period', getPeriodRouter());
app.use('/image', getImageRouter());
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
});

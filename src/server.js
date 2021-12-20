import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import getArtworkRouter from './routers/artworkRouter.js';
import getPeriodRouter from './routers/periodRouter.js';
import getImageRouter from './routers/imageRouter.js';
import errorMiddleware from './middlewares/error-middleware.js';
import testConnection from './utils/check-db-connection.js';
import database from './config/db.js';

// Verify if the db is up first
testConnection(database);

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());
app.use('/artwork', getArtworkRouter());
app.use('/period', getPeriodRouter());
app.use('/image', getImageRouter());
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
});

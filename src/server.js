const express = require('express');
const getArtworkRouter = require('./routers/artworkRouter');
const getPeriodRouter = require('./routers/periodRouter');
const getImageRouter = require('./routers/imageRouter');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/artwork', getArtworkRouter());
app.use('/period', getPeriodRouter());
app.use('/image', getImageRouter());

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
});
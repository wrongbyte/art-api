const express = require('express')
const app = express()
const port = 3000
const db = require('./queries')
//queries are like periods?page=0&limit=20

app.use(express.json())


app.get('/periods', db.getPeriods)
app.get('/artworks', db.getArtworks)
app.get('/artwork/:id/periods', db.getPeriodsOfArtwork)
app.get('/period/:id/artworks', db.getArtworksOfPeriod)
app.get('/artwork/:id', db.getArtworkById)
app.get('/image/:id', db.getImageFile)

app.put('/artwork/:id', db.updateArtwork)
app.put('/artwork/:artwork_id/periods/:period_id', db.putPeriodInArtwork) // adds a period to artwork via join table



app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

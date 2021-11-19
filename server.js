const express = require('express')
const app = express()
const port = 3000
const db = require('./queries')
//queries are like periods?page=0&limit=20

app.get('/periods', db.getPeriods)
app.get('/artworks', db.getArtworks)
app.get('/artwork/', db.getArtworkById)
app.get('/artwork/:id/periods', db.getPeriodsOfArtwork)
app.get('/period/:id/artworks', db.getArtworksOfPeriod)


app.get('/image/:id', db.getImageFile)


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

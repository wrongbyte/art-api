const { Pool } = require('pg')
require('dotenv').config()
const connectionString = process.env.DATABASE_URL

const pool = new Pool({
    connectionString,
  })

const getArtworks = async (request, response) => {
    let { page, limit } = request.query;
    limit = parseInt(limit);
    offset = limit * parseInt(page);
    pool.query('SELECT * FROM artworks LIMIT $1 OFFSET $2', [limit, offset], (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    });
};

const getArtworkById = async (request, response) => {
    let { id } = request.query;
    id = parseInt(id);
    pool.query('SELECT * FROM artworks WHERE id=$1', [id], (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    });
};

const getPeriods = async (request, response) => {
    let { page, limit } = request.query;
    limit = parseInt(limit);
    offset = limit * parseInt(page);
    pool.query('SELECT * FROM periods LIMIT $1 OFFSET $2', [limit, offset], (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    });
}

const getPeriodsOfArtwork = async (request, response) => {
    let id = request.params.id;
    pool.query('SELECT name FROM periods WHERE id IN (SELECT period_id FROM periods_artworks WHERE artwork_id=$1)', [id], (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    })
}

const getArtworksOfPeriod = async (request, response) => {
    let id = request.params.id;
    pool.query('SELECT * FROM artworks WHERE id IN (SELECT artwork_id FROM periods_artworks WHERE period_id=$1)', [id], (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    })
}

const getImageFile = async (request, response) => {
    let id = request.params.id;
    const { rows } = await pool.query('SELECT file FROM artworks WHERE id=$1', [id])
    const filename = rows[0].file

    response.set('Content-Type', 'image/jpg')
    response.sendFile(__dirname + '/media/' + filename)
}

module.exports = {
    getArtworks,
    getArtworkById,
    getPeriods,
    getPeriodsOfArtwork,
    getArtworksOfPeriod,
    getImageFile
}
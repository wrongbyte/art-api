const database = require('../config/db');

// =========== GET ROUTES ===========
const getArtworks = async (request, response) => {
    // TODO: validate page and limit
    let { page, limit } = request.query;
    limit = parseInt(limit);
    offset = limit * parseInt(page);

    if (!limit || !page) return response.status(400).send('Define pagination');

    try {
        const { rows, rowCount } = await database().query('SELECT * FROM artworks LIMIT $1 OFFSET $2', [limit, offset]);
        if (rowCount === 0) return response.sendStatus(404);
        response.status(200).json(rows);
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    };    
};

const getArtworkById = async (request, response) => {
    const { id } = request.params;
    try {
        const { rows, rowCount } = await database().query('SELECT * FROM artworks WHERE id=$1', [id]);
        if (rowCount === 0) return response.sendStatus(404);
        response.status(200).json(rows);
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    }
};

const getPeriodsOfArtwork = async (request, response) => {
    const { id } = request.params;
    try {
        const { rows, rowCount } = await database().query('SELECT name FROM periods WHERE id IN (SELECT period_id FROM periods_artworks WHERE artwork_id=$1)', [id]);
        if (rowCount === 0) return response.sendStatus(404);
        response.status(200).json(rows);
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    };
};

// =========== PUT ROUTES ===========
const updateArtwork = async (request, response) => {
    const { id } = request.params;
    const { file, artist, year, title } = request.body;
    try {
        const { rows, rowCount } = await database().query('SELECT * FROM artworks WHERE id=$1', [id]);
        if (rowCount === 0) return response.sendStatus(404);

        const artwork = rows[0];

        const updateValues = {
            file: file || artwork.file,
            artist: artist || artwork.artist,
            year: year || artwork.year,
            title: title || artwork.title
        };

        await database().query('UPDATE artworks SET file=$1, artist=$2, year=$3, title=$4 WHERE id=$5', [updateValues.file, updateValues.artist, updateValues.year, updateValues.title, id]);
        response.status(200).send(`Artwork modified with ID: ${id}`);

    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    };
};

const putPeriodInArtwork = async (request, response) => {
    const { artwork_id, period_id } = request.params;
    try {
        await database().query('INSERT INTO periods_artworks VALUES($1, $2)', [artwork_id, period_id]);
        return response.sendStatus(201);
    } catch (error) {
        console.log(error);
        if (error.code === '23505') return response.status(400).send('Resource already exists');
        else return response.sendStatus(500);
    };
};

// =========== POST ROUTES ===========
// The postArtwork works with multipart form data. It happens because we need to upload the corresponding image file for the artwork when we submit it.

const postArtwork = async (request, response) => {
    // TODO: handle multer errors first
    const filename = request.file.originalname;
    const { title, artist, year } = request.body;
    try {
        await database().query('INSERT INTO artworks (file, artist, year, title) VALUES ($1, $2, $3, $4)', [filename, artist, year, title]);
        return response.sendStatus(201);
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    };
};

const deleteArtwork = async (request, response) => {
    const { id } = request.params;
    try {
        await database().query('DELETE FROM artworks WHERE id=$1', [id]);
        return response.sendStatus(200);
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    };
};

const deletePeriodFromArtwork = async (request, response) => {
    const { artwork_id, period_id } = request.params;
    try {
        await database().query('DELETE FROM periods_artworks WHERE artwork_id=$1 AND period_id=$2', [artwork_id, period_id]);
        return response.sendStatus(200);
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    };
};

module.exports = {
    getArtworks,
    getArtworkById,
    getPeriodsOfArtwork,
    updateArtwork,
    putPeriodInArtwork,
    postArtwork,
    deleteArtwork,
    deletePeriodFromArtwork
}
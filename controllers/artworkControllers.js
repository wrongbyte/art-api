const database = require('../db');
const uploadImage = require('../utils/multer');

// =========== GET ROUTES ===========
const getArtworks = async (request, response) => {
    let { page, limit } = request.query;
    limit = parseInt(limit);
    offset = limit * parseInt(page);

    if (!limit || !page) return response.status(400).send('Define pagination');

    database().query('SELECT * FROM artworks LIMIT $1 OFFSET $2', [limit, offset], (error, results) => {
        if (error) throw error;
        if (results.rowCount === 0) return response.sendStatus(404);
        return response.status(200).json(results.rows);
    });
};

const getArtworkById = async (request, response) => {
    const { id } = request.params;
    database().query('SELECT * FROM artworks WHERE id=$1', [id], (error, results) => {
        if (error) throw error;
        if (results.rowCount === 0) return response.sendStatus(404);
        response.status(200).json(results.rows);
    });
};

const getPeriodsOfArtwork = async (request, response) => {
    const { id } = request.params;
    database().query('SELECT name FROM periods WHERE id IN (SELECT period_id FROM periods_artworks WHERE artwork_id=$1)', [id], (error, results) => {
        if (error) throw error;
        if (results.rowCount === 0) return response.sendStatus(404);
        response.status(200).json(results.rows);
    });
};

// =========== PUT ROUTES ===========
const updateArtwork = async (request, response) => {
    const { id } = request.params;
    const { file, artist, year, title } = request.body;
    const { rows, rowCount } = await database().query('SELECT * FROM artworks WHERE id=$1', [id]);
    if (rowCount === 0) return response.sendStatus(404);
    const artwork = rows[0];
    
    const updateValues = {
        file: file || artwork.file,
        artist: artist || artwork.artist,
        year: year || artwork.year,
        title: title || artwork.title
    };

    database().query('UPDATE artworks SET file=$1, artist=$2, year=$3, title=$4 WHERE id=$5', [updateValues.file, updateValues.artist, updateValues.year, updateValues.title, id], (error, results) => {
        if (error) {
            console.log(error);
            return response.sendStatus(400);
        };
        response.status(200).send(`Artwork modified with ID: ${id}`);
    })
    console.log(updateValues);
};

const putPeriodInArtwork = async (request, response) => {
    const artwork_id = request.params.artwork_id;
    const period_id = request.params.period_id;
    database().query('INSERT INTO periods_artworks VALUES($1, $2)', [artwork_id, period_id], (error, results) => {
        if (error){
            if (error.code === '23505') return response.status(400).send('Resource already exists');
            else return response.sendStatus(400);
        };
        return response.sendStatus(201);
    });
};

// =========== POST ROUTES ===========
// The postArtwork works with multipart form data. It happens because we need to upload the corresponding image file for the artwork when we submit it.

const postArtwork = async (request, response, next) => {
    uploadImage.single('file')(request, response, () => {
        console.log(request.body);
        next()
    })
}

const handle = (request, response) => {
    console.log('finished');
    response.sendStatus(200);
}


// const postArtwork = async (request, response) => {
//     const { file, artist, year, title } = request.body;
//     if (!file || !artist || !year || !title) return response.sendStatus(400);
//     database().query('INSERT INTO artworks (file, artist, year, title) VALUES ($1, $2, $3, $4)', [file, artist, year, title], (error, result) => {
//         if (error){
//             console.log(error);
//             return response.sendStatus(400);
//         };
//         response.sendStatus(201);
//     });
// };

module.exports = {
    getArtworks,
    getArtworkById,
    getPeriodsOfArtwork,
    updateArtwork,
    putPeriodInArtwork,
    postArtwork,
    handle
}
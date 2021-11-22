const database = require('../db');

// =========== GET ROUTES ===========
const getPeriods = async (request, response) => {
    let { page, limit } = request.query;
    limit = parseInt(limit);
    offset = limit * parseInt(page);

    if (!limit || !page) return response.status(400).send('Define pagination');

    database().query('SELECT * FROM periods LIMIT $1 OFFSET $2', [limit, offset], (error, results) => {
        if (error) throw error;
        if (results.rowCount === 0) return response.sendStatus(404);
        response.status(200).json(results.rows);
    });
};

const getArtworksOfPeriod = async (request, response) => {
    const { id } = request.params;
    database().query('SELECT * FROM artworks WHERE id IN (SELECT artwork_id FROM periods_artworks WHERE period_id=$1)', [id], (error, results) => {
        if (error) throw error;
        if (results.rowCount === 0) return response.sendStatus(404);
        response.status(200).json(results.rows);
    })
};

// =========== PUT ROUTES ===========
const updatePeriod = async (request, response) => {
    const { id } = request.params;
    const { name } = request.body;
    database().query('UPDATE periods SET name=$1 WHERE id=$2', [name, id], (error, result) => {
        if (error) return response.sendStatus(400);
    });
};

// =========== POST ROUTES ===========
const postPeriod = async (request, response) => {
    const { period } = request.body;
    database().query('INSERT INTO periods (name) VALUES ($1)', [period], (error, result) => {
        if (error) {
            if (error.code === '23505') return response.status(400).send('Resource already exists');
            else return response.sendStatus(400);
        };
        response.sendStatus(201);
    });
};

module.exports = {
    getPeriods,
    getArtworksOfPeriod,
    postPeriod,
    updatePeriod
}
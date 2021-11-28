const database = require('../config/db');

// =========== GET ROUTES ===========
const getPeriods = async (request, response) => {
    let { page, limit } = request.query;
    limit = parseInt(limit);
    offset = limit * parseInt(page);

    if (!limit || !page) return response.status(400).send('Define pagination');

    try {
        const { rowCount, rows } = await database().query('SELECT * FROM periods LIMIT $1 OFFSET $2', [limit, offset]);
        if (rowCount === 0) return response.sendStatus(404);
        response.status(200).json(rows);
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    };
};

const getArtworksOfPeriod = async (request, response) => {
    const { id } = request.params;
    try {
        const { rowCount, rows } = await database().query('SELECT * FROM artworks WHERE id IN (SELECT artwork_id FROM periods_artworks WHERE period_id=$1)', [id]);
        if (rowCount === 0) return response.sendStatus(404);
        response.status(200).json(rows);
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    };
};

// =========== PUT ROUTES ===========
const updatePeriod = async (request, response) => {
    const { id } = request.params;
    const { name } = request.body;
    try {
        await database().query('UPDATE periods SET name=$1 WHERE id=$2', [name, id]);
        response.sendStatus(200);
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    };
};

// =========== POST ROUTES ===========
const postPeriod = async (request, response) => {
    const { period } = request.body;
    try {
        await database().query('INSERT INTO periods (name) VALUES ($1)', [period]);
        response.sendStatus(201);
    } catch (error) {
        if (error.code === '23505') return response.status(400).send('Resource already exists');
        else return response.sendStatus(500);
    };
};

module.exports = {
    getPeriods,
    getArtworksOfPeriod,
    postPeriod,
    updatePeriod
}
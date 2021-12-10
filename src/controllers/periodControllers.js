const database = require('../config/db');
const { BadRequestError, NotFoundError } = require('../utils/errors');
const { isValidRequest } = require('../utils/validate-request');

// =========== GET ROUTES ===========
const getPeriods = async (request, response, next) => {
    let { page, limit } = request.query;
    try {
        if (!isValidRequest(page, limit)) throw new BadRequestError('Pagination missing');
    
        limit = parseInt(limit);
        const offset = limit * parseInt(page);
    
        const { rowCount, rows } = await database().query('SELECT * FROM periods LIMIT $1 OFFSET $2', [limit, offset]);
        if (rowCount === 0) throw new NotFoundError;
        return response.status(200).json(rows);
    } catch (error) {
        next(error)
    };
};

const getArtworksOfPeriod = async (request, response, next) => {
    const { id } = request.params;
    try {
        const { rowCount, rows } = await database().query('SELECT * FROM artworks WHERE id IN (SELECT artwork_id FROM periods_artworks WHERE period_id=$1)', [id]);
        if (rowCount === 0) throw new NotFoundError;
        return response.status(200).json(rows);
    } catch (error) {
        next(error)
    };
};

// =========== PUT ROUTES ===========
const updatePeriod = async (request, response, next) => {
    const { id } = request.params;
    const { name } = request.body;
    try {
        if (!name) throw new BadRequestError('Fields missing');
        await database().query('UPDATE periods SET name=$1 WHERE id=$2', [name, id]);
        return response.sendStatus(200);
    } catch (error) {
        next(error)
    };
};

// =========== POST ROUTES ===========
const postPeriod = async (request, response, next) => {
    const { period } = request.body;
    try {
        if (!period) throw new BadRequestError('Fields missing');
        await database().query('INSERT INTO periods (name) VALUES ($1)', [period]);
        return response.sendStatus(201);
    } catch (error) {
        next(error)
    };
};

module.exports = {
    getPeriods,
    getArtworksOfPeriod,
    postPeriod,
    updatePeriod
}
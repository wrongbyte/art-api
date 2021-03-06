import database from '../config/db.js';
import { BadRequestError, NotFoundError } from '../utils/errors.js';
import { isValidRequest } from '../utils/helpers.js';
import { processImageFile, bucket } from '../middlewares/process-image.js';
import { Request, Response, NextFunction } from 'express';
import { Artwork, isArtwork } from '../types/Artwork.js';

// =========== GET ROUTES ===========
const getArtworks = async (request: Request, response: Response, next: NextFunction) => {
    let { page, limit } = request.query as { page: string, limit: string };
    try {
        if (!isValidRequest(page, limit)) throw new BadRequestError('Pagination missing');

        const offset = parseInt(limit) * parseInt(page);

        const { rows, rowCount } = await database().query('SELECT * FROM artworks LIMIT $1 OFFSET $2', [limit, offset]);
        if (rowCount === 0) throw new NotFoundError;
        
        return response.status(200).json(rows);
    } catch (error) {
        next(error)        
    };    
};

const getArtworkById = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
        const { rows, rowCount } = await database().query('SELECT * FROM artworks WHERE id=$1', [id]);
        if (rowCount === 0) throw new NotFoundError;
        return response.status(200).json(rows);
    } catch (error) {
        next(error)        
    };
};

const getPeriodsOfArtwork = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
        const { rows, rowCount } = await database().query('SELECT name FROM periods WHERE id IN (SELECT period_id FROM periods_artworks WHERE artwork_id=$1)', [id]);
        if (rowCount === 0) throw new NotFoundError;
        return response.status(200).json(rows);
    } catch (error) {
        next(error)       
    };
};

// =========== PUT ROUTES ===========
const updateArtwork = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const { file, artist, year, title } = request.body;
    try {
        const { rows, rowCount } = await database().query('SELECT * FROM artworks WHERE id=$1', [id]);
        if (rowCount === 0) throw new NotFoundError;

        const artwork = rows[0];

        const updateValues = {
            file: file || artwork.file,
            artist: artist || artwork.artist,
            year: year || artwork.year,
            title: title || artwork.title
        };

        await database().query('UPDATE artworks SET file=$1, artist=$2, year=$3, title=$4 WHERE id=$5', [updateValues.file, updateValues.artist, updateValues.year, updateValues.title, id]);
        return response.status(200).send(`Artwork modified with ID: ${id}`);

    } catch (error) {
        next(error)       
    };
};

//empty body
const putPeriodInArtwork = async (request: Request, response: Response, next: NextFunction) => {
    const { artwork_id, period_id } = request.params;
    try {
        if (!isValidRequest(artwork_id, period_id)) throw new BadRequestError('Fields missing');
        await database().query('INSERT INTO periods_artworks VALUES($1, $2)', [artwork_id, period_id]);
        return response.sendStatus(201);
    } catch (error) {
        next(error)
    };
};

// =========== POST ROUTES ===========
// The postArtwork works with multipart form data, because we need to upload the corresponding image file for the artwork when we submit it.

const postArtwork = async (request: Request, response: Response, next: NextFunction) => {
    try{
        if (!isArtwork(request.body)) throw new BadRequestError('Invalid request, fields missing');
        const { title, artist, year } : Artwork = request.body;

        const filename = await processImageFile(request, response);
        await database().query('INSERT INTO artworks (file, artist, year, title) VALUES ($1, $2, $3, $4)', [filename, artist, year, title]);
        return response.sendStatus(201);
    } catch(error) {
        next(error);
    };
};

// =========== DELETE ROUTES ===========
const deleteArtwork = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    try {
        const { rows, rowCount } = await database().query('SELECT file FROM artworks WHERE id=$1', [id]);
        if (rowCount === 0) throw new NotFoundError;
        const filename = rows[0].file;
        await database().query('DELETE FROM artworks WHERE id=$1', [id]);
        await bucket.file(filename).delete();
        return response.sendStatus(200);
    } catch (error) {
        next(error)
    };
};

const deletePeriodFromArtwork = async (request: Request, response: Response, next: NextFunction) => {
    const { artwork_id, period_id } = request.params;
    try {
        if (!isValidRequest(artwork_id, period_id)) throw new BadRequestError('Fields missing');
        await database().query('DELETE FROM periods_artworks WHERE artwork_id=$1 AND period_id=$2', [artwork_id, period_id]);
        return response.sendStatus(200);
    } catch (error) {
        next(error)
    };
};

export {
    getArtworks,
    getArtworkById,
    getPeriodsOfArtwork,
    updateArtwork,
    putPeriodInArtwork,
    postArtwork,
    deleteArtwork,
    deletePeriodFromArtwork
}
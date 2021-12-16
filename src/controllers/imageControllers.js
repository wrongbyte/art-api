import database from '../config/db.js';
import { NotFoundError } from '../utils/errors.js';

// =========== GET ROUTES ===========
const getImageFile = async (request, response, next) => {
    const { id } = request.params;
    try {
        const { rows, rowCount } = await database().query('SELECT file FROM artworks WHERE id=$1', [id]);
        if (rowCount === 0) throw new NotFoundError;
        const filename = rows[0].file;
        return response.redirect(`https://storage.googleapis.com/art_api/${filename}`);
    } catch (error) {
        next(error)
    };
};

export {
    getImageFile
}
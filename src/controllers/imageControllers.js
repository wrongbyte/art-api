const database = require('../config/db');
const { NotFoundError } = require('../utils/errors');
const rootDirectory = require('path').resolve('./');

// =========== GET ROUTES ===========
const getImageFile = async (request, response, next) => {
    const { id } = request.params;
    try {
        const { rows, rowCount } = await database().query('SELECT file FROM artworks WHERE id=$1', [id]);
        if (rowCount === 0) throw new NotFoundError;
        const filename = rows[0].file;
        // response.set('Content-Type', 'image/jpg'); // essa header atrapalha o try-catch 
        response.sendFile(rootDirectory + '/media/' + filename);
    } catch (error) {
        next(error)
    };
};

module.exports = {
    getImageFile
}
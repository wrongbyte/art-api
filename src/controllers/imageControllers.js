const database = require('../config/db');
const rootDirectory = require('path').resolve('../');

// =========== GET ROUTES ===========
const getImageFile = async (request, response) => {
    const { id } = request.params;
    try {
        const { rows, rowCount } = await database().query('SELECT file FROM artworks WHERE id=$1', [id]);
        if (rowCount === 0) return response.sendStatus(404);
        const filename = rows[0].file;
    
        response.set('Content-Type', 'image/jpg');
        response.sendFile(rootDirectory + '/media/' + filename);
    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    };
};

module.exports = {
    getImageFile
}
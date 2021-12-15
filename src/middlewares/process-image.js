const { format } = require('util');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({ keyFilename: 'keys.json'});
const bucket = storage.bucket('art_api');
const { BadRequestError, uploadError } = require('../utils/errors');

const processImageFile = async (request, response) => {
    try {
        if (!request.file) throw new BadRequestError('Missing file');

        const blob = bucket.file(request.file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false
        });
    
        blobStream.on('error', (error) => {
            throw new uploadError(error.message);
        });

        blobStream.end(request.file.buffer);

        return request.file.originalname;

    } catch (error) {
        throw new uploadError(error.message);
    }
};

module.exports = processImageFile;
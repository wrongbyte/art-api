import { fileTypeFromBuffer } from 'file-type';
import { Storage } from '@google-cloud/storage';
import { BadRequestError, uploadError } from '../utils/errors.js';
const storage = new Storage({ keyFilename: 'keys.json'});
const bucket = storage.bucket('art_api');

const whitelist = [
    'image/png',
    'image/jpg',
    'image/jpeg'
]

const processImageFile = async (request, response) => {
    try {
        if (!request.file) throw new BadRequestError('Missing file');

        const metadata = await fileTypeFromBuffer(request.file.buffer);
        if (!whitelist.includes(metadata.mime)) {
            throw new BadRequestError('File type not allowed');
        }

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

export default processImageFile;
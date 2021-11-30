const isValidArtwork = (body) => {
    if (!body.title) return false;
    if (!body.artist) return false;
    if (!body.year) return false;
    return true;
};

const isValidRequest = (param1, param2) => {
    if (!param1) return false;
    if (!param2) return false;
    return true;
};

module.exports = {
    isValidArtwork,
    isValidRequest
}
const isValidArtwork = (body: any) => {
    if (!body.title) return false;
    if (!body.artist) return false;
    if (!body.year) return false;
    return true;
};

const isValidRequest = (param1: string, param2: string) => {
    if (!param1) return false;
    if (!param2) return false;
    return true;
};

export {
    isValidArtwork,
    isValidRequest
}
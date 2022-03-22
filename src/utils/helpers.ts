const isValidRequest = (param1: string, param2: string) => {
    if (!param1) return false;
    if (!param2) return false;
    return true;
};

export {
    isValidRequest
}
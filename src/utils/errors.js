class GeneralError extends Error {
    constructor () {
        super();
        this.message;
        this.status;
    }
};

class BadRequestError extends GeneralError {
    constructor (message) {
        super();
        this.message = message;
        this.status = 400;
    }
};

class NotFoundError extends GeneralError {
    constructor () {
        super();
        this.message = 'Not found';
        this.status = 404;
    }
};

class uploadError extends GeneralError {
    constructor (message) {
        super();
        this.message = message;
        this.status = 500;
    }
}

export {
    GeneralError,
    BadRequestError,
    NotFoundError,
    uploadError
}
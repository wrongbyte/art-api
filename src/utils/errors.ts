class GeneralError extends Error {
    message!: string;
    status!: number;
    constructor () {
        super();
        this.message;
        this.status;
    }
};

class BadRequestError extends GeneralError {
    message: string;
    status: number;
    constructor (message: string) {
        super();
        this.message = message;
        this.status = 400;
    }
};

class NotFoundError extends GeneralError {
    message: string;
    status: number;
    constructor () {
        super();
        this.message = 'Not found';
        this.status = 404;
    }
};

class uploadError extends GeneralError {
    message: string;
    status: number;
    constructor (message: string) {
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
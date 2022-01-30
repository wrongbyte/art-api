import { GeneralError } from "../utils/errors.js";
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (error: GeneralError, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Internal server error'

    return response.status(status).json({
        status: status,
        message: message
    });
};

export default errorMiddleware;
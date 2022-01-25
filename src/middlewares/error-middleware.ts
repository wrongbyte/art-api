import { GeneralError } from "../utils/errors";
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (error: any, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof GeneralError) {
        return response.status(error['status']).json({
            status: 'error',
            message: error.message
        })
    }
    if (error.code === '23505') {
        return response.status(400).json({
            status: 'error',
            message: 'Resource already exists'
        })
    }
    return response.status(500).json({
        status: 'error',
        message: error.message
    });
};

export default errorMiddleware;
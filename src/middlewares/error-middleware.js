import { GeneralError } from "../utils/errors.js";

const errorMiddleware = (error, request, response, next) => {
    if (error instanceof GeneralError) {
        return response.status(error.status).json({
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
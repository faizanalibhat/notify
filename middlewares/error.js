const { ApiError } = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    console.error(err.stack);

    // Handle ApiError instances
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
        success: false,
        error: {
            message: err.message,
            code: err.errorCode,
            details: err.details
        }
        });
    }

    // Handle MongoDB duplicate key error
    if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).json({
        success: false,
        error: {
            message: 'Duplicate key error',
            code: 'DUPLICATE_KEY',
            details: err.keyValue
        }
        });
    }

    // Handle validation errors (e.g., Mongoose)
    if (err.name === 'ValidationError') {
        const details = Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message
        }));

        return res.status(422).json({
        success: false,
        error: {
            message: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details
        }
        });
    }

    // Handle JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
        success: false,
        error: {
            message: 'Invalid token',
            code: 'INVALID_TOKEN'
        }
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
        success: false,
        error: {
            message: 'Token expired',
            code: 'TOKEN_EXPIRED'
        }
        });
    }

    // Default to 500 server error
    return res.status(500).json({
        success: false,
        error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR'
        }
    });
};


module.exports = {
    errorHandler
}
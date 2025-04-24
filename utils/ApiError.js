// ApiError class for custom API errors
class ApiError extends Error {
    constructor(statusCode, message, errorCode = null, details = null) {
      super(message);
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      this.details = details;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message, errorCode = 'BAD_REQUEST', details = null) {
      return new ApiError(400, message, errorCode, details);
    }

    static unauthorized(message = 'Unauthorized', errorCode = 'UNAUTHORIZED', details = null) {
      return new ApiError(401, message, errorCode, details);
    }

    static forbidden(message = 'Forbidden', errorCode = 'FORBIDDEN', details = null) {
      return new ApiError(403, message, errorCode, details);
    }

    static notFound(message = 'Resource not found', errorCode = 'NOT_FOUND', details = null) {
      return new ApiError(404, message, errorCode, details);
    }

    static conflict(message = 'Conflict', errorCode = 'CONFLICT', details = null) {
      return new ApiError(409, message, errorCode, details);
    }

    static validationError(message = 'Validation error', details = null) {
      return new ApiError(422, message, 'VALIDATION_ERROR', details);
    }

    static internalServerError(message = 'Internal server error', errorCode = 'INTERNAL_SERVER_ERROR', details = null) {
      return new ApiError(500, message, errorCode, details);
    }

    static serviceUnavailable(message = 'Service unavailable', errorCode = 'SERVICE_UNAVAILABLE', details = null) {
      return new ApiError(503, message, errorCode, details);
    }
}



module.exports = {
  ApiError,
}
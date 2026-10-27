/**
 * Operational error with an HTTP status and a stable machine-readable code.
 * Anything thrown that is not an ApiError is treated as an unexpected 500.
 */
export class ApiError extends Error {
  constructor(statusCode, message, { code, details } = {}) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.code = code || ApiError.defaultCode(statusCode);
    this.details = details;
  }

  static defaultCode(status) {
    return (
      {
        400: 'BAD_REQUEST',
        401: 'UNAUTHORIZED',
        403: 'FORBIDDEN',
        404: 'NOT_FOUND',
        409: 'CONFLICT',
        413: 'PAYLOAD_TOO_LARGE',
        415: 'UNSUPPORTED_MEDIA_TYPE',
        422: 'VALIDATION_ERROR',
        429: 'TOO_MANY_REQUESTS'
      }[status] || 'INTERNAL_ERROR'
    );
  }

  static badRequest(message = 'Bad request', opts) {
    return new ApiError(400, message, opts);
  }
  static unauthorized(message = 'Authentication required', opts) {
    return new ApiError(401, message, opts);
  }
  static forbidden(message = 'You do not have permission to perform this action', opts) {
    return new ApiError(403, message, opts);
  }
  static notFound(message = 'Resource not found', opts) {
    return new ApiError(404, message, opts);
  }
  static conflict(message = 'Resource already exists', opts) {
    return new ApiError(409, message, opts);
  }
  static validation(details, message = 'Validation failed') {
    return new ApiError(422, message, { details });
  }
}

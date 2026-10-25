import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

export function notFound(req, _res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`, { code: 'ROUTE_NOT_FOUND' }));
}

/** Converts known library errors into ApiErrors with sensible status codes. */
function normalize(err) {
  if (err instanceof ApiError) return err;

  // Malformed JSON body / body too large (from express.json)
  if (err.type === 'entity.parse.failed') {
    return ApiError.badRequest('Request body contains invalid JSON', { code: 'INVALID_JSON' });
  }
  if (err.type === 'entity.too.large') {
    return new ApiError(413, 'Request body is too large');
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.values(err.errors).map((e) => ({ location: 'body', field: e.path, message: e.message }));
    return ApiError.validation(details);
  }
  if (err instanceof mongoose.Error.CastError) {
    return ApiError.badRequest(`Invalid value for ${err.path}`, { code: 'INVALID_ID' });
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || err.keyPattern || {})[0] || 'field';
    const message = field === 'email' ? 'An account with this email already exists' : `Duplicate value for ${field}`;
    return ApiError.conflict(message, { code: 'DUPLICATE_KEY', details: [{ field, message }] });
  }
  if (err instanceof mongoose.Error.StrictModeError) {
    return ApiError.badRequest(err.message, { code: 'UNKNOWN_FIELD' });
  }

  const wrapped = new ApiError(500, 'Something went wrong. Please try again later.');
  wrapped.cause = err;
  return wrapped;
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, _next) {
  const apiError = normalize(err);

  if (apiError.statusCode >= 500 && !env.isTest) {
    console.error(`[error] ${req.method} ${req.originalUrl}`, apiError.cause || err);
  }

  const body = {
    success: false,
    error: { code: apiError.code, message: apiError.message }
  };
  if (apiError.details) body.error.details = apiError.details;
  if (!env.isProduction && apiError.statusCode >= 500 && apiError.cause) {
    body.error.debug = apiError.cause.message;
  }

  res.status(apiError.statusCode).json(body);
}

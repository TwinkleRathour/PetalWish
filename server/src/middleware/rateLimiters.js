import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

function limitedResponse(message) {
  return { success: false, error: { code: 'TOO_MANY_REQUESTS', message } };
}

/** General API limit per IP. */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skip: () => env.isTest,
  message: limitedResponse('Too many requests, please slow down.')
});

/** Strict limit for login/registration to slow down brute-force attempts. */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  skip: () => env.isTest,
  message: limitedResponse('Too many login attempts. Please try again in 15 minutes.')
});

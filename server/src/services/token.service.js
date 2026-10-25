import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const ISSUER = 'petalwish-api';

/** Signs an access token. `ver` lets us revoke all tokens by bumping user.tokenVersion. */
export function signAccessToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role, ver: user.tokenVersion ?? 0 }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
    issuer: ISSUER
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.JWT_SECRET, { issuer: ISSUER, algorithms: ['HS256'] });
}

/** Response payload returned by register/login. */
export function buildAuthPayload(user) {
  const token = signAccessToken(user);
  const { exp } = jwt.decode(token);
  return { token, tokenType: 'Bearer', expiresAt: new Date(exp * 1000).toISOString(), user };
}

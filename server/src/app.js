import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import apiRoutes from './routes/index.js';
import { apiLimiter } from './middleware/rateLimiters.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { ApiError } from './utils/ApiError.js';
import { UPLOAD_ROOT, ensureUploadDirs } from './middleware/upload.js';

// Repository root: holds index.html, style.css, script.js and assets/
const FRONTEND_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export function createApp() {
  const app = express();

  app.set('trust proxy', 1); // correct client IPs behind Render/Railway/Vercel proxies
  app.disable('x-powered-by');

  // The current frontend loads fonts/scripts from CDNs, so the default CSP is turned off
  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

  app.use(
    cors({
      origin(origin, callback) {
        // Allow same-origin / server-to-server requests (no Origin header) and listed origins
        if (!origin || env.clientOrigins.includes(origin)) return callback(null, true);
        callback(ApiError.forbidden(`Origin ${origin} is not allowed by CORS`, { code: 'CORS_BLOCKED' }));
      },
      credentials: true
    })
  );

  // Designs can contain uploaded images as data URLs, so allow reasonably large bodies
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: false, limit: '1mb' }));

  if (!env.isTest) app.use(morgan(env.isProduction ? 'combined' : 'dev'));

  app.use('/api', apiLimiter, apiRoutes);
  app.use('/api', notFound);

  // Images uploaded through multer. Names are random, so they can be cached for a long time.
  // Cross-Origin-Resource-Policy lets pages on other origins (e.g. the Vite dev server) show them.
  ensureUploadDirs();
  app.use(
    '/uploads',
    (_req, res, next) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
      next();
    },
    express.static(UPLOAD_ROOT, { index: false, dotfiles: 'deny', maxAge: '30d', immutable: true })
  );

  if (env.SERVE_FRONTEND) {
    // Serve only the public frontend files — never the server/ folder or .env
    app.use('/assets', express.static(path.join(FRONTEND_ROOT, 'assets'), { maxAge: '7d' }));
    for (const file of ['style.css', 'script.js', 'api.js']) {
      app.get(`/${file}`, (_req, res) => res.sendFile(path.join(FRONTEND_ROOT, file)));
    }
    app.get(['/', '/index.html'], (_req, res) => res.sendFile(path.join(FRONTEND_ROOT, 'index.html')));
  }

  app.use(notFound);
  app.use(errorHandler);
  return app;
}

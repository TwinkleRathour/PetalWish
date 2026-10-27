import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { z } from 'zod';

// Always read server/.env, regardless of the directory the process was started from
const serverRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
dotenv.config({ path: path.join(serverRoot, '.env'), quiet: true });

const isProduction = process.env.NODE_ENV === 'production';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),

  // MongoDB Atlas connection string, e.g.
  // mongodb+srv://<user>:<password>@<cluster>.mongodb.net/petalwish?retryWrites=true&w=majority
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required').optional(),

  JWT_SECRET: isProduction
    ? z.string().min(32, 'JWT_SECRET must be at least 32 characters in production')
    : z.string().min(1).default('dev-only-insecure-secret-change-me-before-deploying'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // Comma-separated list of allowed browser origins (Vite dev server, deployed frontend…)
  CLIENT_ORIGIN: z.string().default('http://localhost:5173,http://localhost:5000,http://localhost:8000'),

  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(4).max(15).default(12),

  // Serve the existing static frontend (index.html, style.css, script.js, assets/) from Express
  SERVE_FRONTEND: z
    .enum(['true', 'false'])
    .default('true')
    .transform((v) => v === 'true'),

  // Seed the template catalogue automatically when the collection is empty
  AUTO_SEED_TEMPLATES: z
    .enum(['true', 'false'])
    .default('true')
    .transform((v) => v === 'true'),

  // File uploads (multer): folder for uploaded images, max size per image in MB
  UPLOAD_DIR: z.string().default(path.join(serverRoot, 'uploads')),
  MAX_UPLOAD_MB: z.coerce.number().positive().max(50).default(5),
  // Public base URL of this server, used to build links to uploaded files
  // (e.g. https://petalwish-api.onrender.com). Defaults to the host of each request.
  PUBLIC_URL: z.url().optional(),

  // Create the demo accounts used by the login modal's demo buttons (default: on, except in production)
  SEED_DEMO_USERS: z
    .enum(['true', 'false'])
    .optional()
    .transform((v) => (v === undefined ? process.env.NODE_ENV !== 'production' : v === 'true')),

  // Optional: `npm run seed` creates/updates this admin account
  ADMIN_NAME: z.string().optional(),
  ADMIN_EMAIL: z.string().optional(),
  ADMIN_PASSWORD: z.string().optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment configuration:');
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
  }
  process.exit(1);
}

export const env = {
  ...parsed.data,
  clientOrigins: parsed.data.CLIENT_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean),
  isProduction: parsed.data.NODE_ENV === 'production',
  isTest: parsed.data.NODE_ENV === 'test'
};

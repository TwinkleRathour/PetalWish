import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import multer from 'multer';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Multer configuration for image uploads.
 *
 * Files are written to disk under UPLOAD_DIR/<kind>/ with a random file name, and are
 * served by Express at /uploads/<kind>/<file>. Only PNG, JPEG, WEBP and GIF are accepted:
 * the browser-reported MIME type is checked first (fileFilter), then the file's real
 * content is checked by its signature bytes (verifyImageContent), so a renamed .exe or
 * .html file is rejected even if it claims to be an image. SVG is not allowed because it
 * can contain scripts.
 */
export const UPLOAD_ROOT = path.resolve(env.UPLOAD_DIR);

// Folder per kind of upload (also stored on the Upload document)
export const UPLOAD_KINDS = {
  'design-image': 'design-images',
  avatar: 'avatars',
  'design-thumbnail': 'design-thumbnails',
  'template-thumbnail': 'template-thumbnails'
};

export const IMAGE_TYPES = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/gif': 'gif'
};

export const MAX_UPLOAD_BYTES = Math.round(env.MAX_UPLOAD_MB * 1024 * 1024);

/** Creates the upload folders if they do not exist yet. */
export function ensureUploadDirs() {
  for (const folder of Object.values(UPLOAD_KINDS)) {
    fs.mkdirSync(path.join(UPLOAD_ROOT, folder), { recursive: true });
  }
}

function createImageUploader(kind) {
  const folder = UPLOAD_KINDS[kind];

  const storage = multer.diskStorage({
    destination(_req, _file, cb) {
      const dir = path.join(UPLOAD_ROOT, folder);
      fs.mkdir(dir, { recursive: true }, (err) => cb(err, dir));
    },
    // Never use the client's file name on disk: random name + extension from the MIME type
    filename(_req, file, cb) {
      cb(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${IMAGE_TYPES[file.mimetype]}`);
    }
  });

  return multer({
    storage,
    limits: { fileSize: MAX_UPLOAD_BYTES, files: 1, fields: 10 },
    fileFilter(_req, file, cb) {
      if (IMAGE_TYPES[file.mimetype]) return cb(null, true);
      cb(
        new ApiError(415, 'Only PNG, JPEG, WEBP or GIF images can be uploaded', { code: 'UNSUPPORTED_FILE_TYPE' })
      );
    }
  });
}

/**
 * Middleware that accepts one image in the multipart field "image" and stores it as `kind`.
 * Usage: router.post('/images', requireAuth, uploadImage('design-image'), handler)
 */
export function uploadImage(kind) {
  if (!UPLOAD_KINDS[kind]) throw new Error(`Unknown upload kind: ${kind}`);
  const single = createImageUploader(kind).single('image');

  return [
    single,
    (req, _res, next) => {
      if (!req.file) {
        throw ApiError.badRequest('Attach an image file in the form field "image"', { code: 'FILE_REQUIRED' });
      }
      req.file.kind = kind;
      next();
    },
    verifyImageContent
  ];
}

// First bytes of each allowed format
const SIGNATURES = {
  'image/png': (b) => b.length >= 8 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  'image/jpeg': (b) => b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  'image/gif': (b) => b.length >= 6 && ['GIF87a', 'GIF89a'].includes(b.subarray(0, 6).toString('ascii')),
  'image/webp': (b) =>
    b.length >= 12 && b.subarray(0, 4).toString('ascii') === 'RIFF' && b.subarray(8, 12).toString('ascii') === 'WEBP'
};

/** Rejects files whose content does not match the image type they claim to be. */
async function verifyImageContent(req, _res, next) {
  const handle = await fsp.open(req.file.path, 'r');
  let header;
  try {
    const { buffer, bytesRead } = await handle.read(Buffer.alloc(12), 0, 12, 0);
    header = buffer.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }

  if (!SIGNATURES[req.file.mimetype]?.(header)) {
    // The error handler deletes req.file from disk
    throw new ApiError(415, 'The file is not a valid PNG, JPEG, WEBP or GIF image', { code: 'INVALID_IMAGE' });
  }
  next();
}

/** Deletes an uploaded file, ignoring files that are already gone. */
export async function removeFileQuietly(filePath) {
  if (!filePath) return;
  try {
    await fsp.unlink(filePath);
  } catch (err) {
    if (err.code !== 'ENOENT') console.warn('[upload] Could not delete file:', filePath, err.message);
  }
}

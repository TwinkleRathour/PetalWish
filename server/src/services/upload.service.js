import path from 'node:path';
import { Upload } from '../models/index.js';
import { env } from '../config/env.js';
import { UPLOAD_ROOT, UPLOAD_KINDS, removeFileQuietly } from '../middleware/upload.js';

/** Base URL for links to uploaded files: PUBLIC_URL, or the host the request came in on. */
export function publicBaseUrl(req) {
  return (env.PUBLIC_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
}

/** Absolute URL of an upload, so it also works when the page is served from another port/site. */
export function uploadUrl(req, upload) {
  return `${publicBaseUrl(req)}${upload.path}`;
}

export function serializeUpload(req, upload) {
  return { ...upload.toJSON(), url: uploadUrl(req, upload) };
}

/** Saves the Upload document for the file multer just stored in req.file. */
export function recordUpload(req, { design, template } = {}) {
  const { file } = req;
  return Upload.create({
    owner: req.user._id,
    kind: file.kind,
    filename: file.filename,
    originalName: file.originalname?.slice(0, 255),
    mimetype: file.mimetype,
    size: file.size,
    path: `/uploads/${UPLOAD_KINDS[file.kind]}/${file.filename}`,
    design,
    template
  });
}

function diskPath(upload) {
  return path.join(UPLOAD_ROOT, UPLOAD_KINDS[upload.kind], upload.filename);
}

/** Deletes an upload's file from disk and its document from MongoDB. */
export async function deleteUpload(upload) {
  await removeFileQuietly(diskPath(upload));
  await upload.deleteOne();
}

/** Deletes every upload matching `filter` (e.g. the old avatar when a new one is set). */
export async function deleteUploadsWhere(filter) {
  const uploads = await Upload.find(filter);
  await Promise.all(uploads.map(deleteUpload));
  return uploads.length;
}

import { Upload } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { sendSuccess, paginate, paginationMeta } from '../utils/response.js';
import { recordUpload, serializeUpload, deleteUpload } from '../services/upload.service.js';

/** POST /api/uploads/images — an image placed on a card in the editor. */
export async function uploadDesignImage(req, res) {
  const upload = await recordUpload(req);
  sendSuccess(res, serializeUpload(req, upload), { status: 201 });
}

export async function listMyUploads(req, res) {
  const filter = { owner: req.user._id };
  if (req.valid.query.kind) filter.kind = req.valid.query.kind;
  const page = paginate(req.valid.query);

  const [uploads, total] = await Promise.all([
    Upload.find(filter).sort({ createdAt: -1, _id: 1 }).skip(page.skip).limit(page.limit),
    Upload.countDocuments(filter)
  ]);
  sendSuccess(res, uploads.map((u) => serializeUpload(req, u)), { meta: paginationMeta(page, total) });
}

async function findOwnUpload(req) {
  const upload = await Upload.findOne({ _id: req.valid.params.id, owner: req.user._id });
  if (!upload) throw ApiError.notFound('Upload not found', { code: 'UPLOAD_NOT_FOUND' });
  return upload;
}

export async function getUpload(req, res) {
  sendSuccess(res, serializeUpload(req, await findOwnUpload(req)));
}

export async function removeUpload(req, res) {
  const upload = await findOwnUpload(req);
  await deleteUpload(upload);
  sendSuccess(res, { id: upload.id, deleted: true });
}

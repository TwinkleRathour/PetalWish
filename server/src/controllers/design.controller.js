import { Design, Template } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { sendSuccess, paginate, paginationMeta, escapeRegex } from '../utils/response.js';
import { findTemplateOr404 } from '../services/template.service.js';
import { recordUpload, uploadUrl, deleteUploadsWhere } from '../services/upload.service.js';

const SORTS = {
  updated: { updatedAt: -1, _id: 1 },
  created: { createdAt: -1, _id: 1 },
  title: { title: 1, _id: 1 }
};

/** Loads a design owned by the current user. Other users' designs look like 404s. */
async function findOwnDesign(req) {
  const design = await Design.findOne({ _id: req.valid.params.id, owner: req.user._id });
  if (!design) throw ApiError.notFound('Design not found', { code: 'DESIGN_NOT_FOUND' });
  return design;
}

export async function listDesigns(req, res) {
  const { q, status, sort } = req.valid.query;
  const filter = { owner: req.user._id };
  if (status) filter.status = status;
  if (q) filter.title = new RegExp(escapeRegex(q), 'i');

  const page = paginate(req.valid.query);
  const [designs, total] = await Promise.all([
    // Listings skip the heavy canvas data; fetch a single design to edit it
    Design.find(filter, { elements: 0, surfaces: 0 }).sort(SORTS[sort]).skip(page.skip).limit(page.limit),
    Design.countDocuments(filter)
  ]);

  sendSuccess(res, designs, { meta: paginationMeta(page, total) });
}

export async function getDesign(req, res) {
  sendSuccess(res, await findOwnDesign(req));
}

export async function createDesign(req, res) {
  const { templateId, ...fields } = req.body;
  const data = { ...fields, owner: req.user._id };

  if (templateId) {
    const template = await findTemplateOr404(templateId);
    data.template = template._id;
    data.templateSlug = template.slug;
    data.title ??= template.title;
    data.category ??= template.category;
    data.bg ??= template.bg.toObject();
    data.elements ??= template.elements;
    await Template.updateOne({ _id: template._id }, { $inc: { usageCount: 1 } });
  }

  const design = await Design.create(data);
  sendSuccess(res, design, { status: 201 });
}

export async function updateDesign(req, res) {
  const design = await findOwnDesign(req);
  design.set(req.body);
  // Mixed paths are not change-tracked deeply; mark them explicitly
  for (const key of ['bg', 'elements', 'surfaces']) {
    if (key in req.body) design.markModified(key);
  }
  await design.save();
  sendSuccess(res, design);
}

export async function deleteDesign(req, res) {
  const design = await findOwnDesign(req);
  await design.deleteOne();
  await deleteUploadsWhere({ design: design._id, kind: 'design-thumbnail' });
  sendSuccess(res, { id: design.id, deleted: true });
}

/** PUT /api/designs/:id/thumbnail — preview image uploaded with multer (field "image"). */
export async function uploadThumbnail(req, res) {
  const design = await findOwnDesign(req); // on 404 the error handler deletes the uploaded file
  const upload = await recordUpload(req, { design: design._id });
  await deleteUploadsWhere({ design: design._id, kind: 'design-thumbnail', _id: { $ne: upload._id } });
  design.thumbnail = uploadUrl(req, upload);
  await design.save();
  sendSuccess(res, design);
}

export async function duplicateDesign(req, res) {
  const source = await findOwnDesign(req);
  const copy = source.toObject();
  delete copy._id;
  delete copy.createdAt;
  delete copy.updatedAt;
  // An uploaded thumbnail file belongs to the original and is deleted with it
  if (copy.thumbnail?.includes('/uploads/design-thumbnails/')) delete copy.thumbnail;

  const design = await Design.create({
    ...copy,
    title: req.body?.title || `${source.title} (copy)`.slice(0, 120),
    status: 'draft'
  });
  sendSuccess(res, design, { status: 201 });
}

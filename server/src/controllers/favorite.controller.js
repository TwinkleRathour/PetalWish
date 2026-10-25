import mongoose from 'mongoose';
import { Favorite, Template } from '../models/index.js';
import { sendSuccess, paginate, paginationMeta } from '../utils/response.js';
import { findTemplateOr404 } from '../services/template.service.js';

export async function listFavorites(req, res) {
  const filter = { user: req.user._id };
  const page = paginate(req.valid.query);

  const [favorites, total] = await Promise.all([
    Favorite.find(filter)
      .sort({ createdAt: -1, _id: 1 })
      .skip(page.skip)
      .limit(page.limit)
      .populate({ path: 'template', match: { isPublished: true } }),
    Favorite.countDocuments(filter)
  ]);

  const data = favorites
    .filter((f) => f.template) // template may have been unpublished
    .map((f) => ({ ...f.template.toJSON(), isFavorite: true, favoritedAt: f.createdAt }));

  sendSuccess(res, data, { meta: paginationMeta(page, total) });
}

/** Lightweight list of favourite template ids and slugs, for heart icons. */
export async function listFavoriteIds(req, res) {
  const favorites = await Favorite.find({ user: req.user._id }).populate('template', 'slug').lean();
  const live = favorites.filter((f) => f.template);
  sendSuccess(res, {
    ids: live.map((f) => f.template._id.toString()),
    slugs: live.map((f) => f.template.slug)
  });
}

export async function addFavorite(req, res) {
  const template = await findTemplateOr404(req.valid.params.templateId);
  const result = await Favorite.updateOne(
    { user: req.user._id, template: template._id },
    { $setOnInsert: { user: req.user._id, template: template._id } },
    { upsert: true }
  );

  const created = result.upsertedCount === 1;
  if (created) await Template.updateOne({ _id: template._id }, { $inc: { favoritesCount: 1 } });

  sendSuccess(
    res,
    { templateId: template.id, slug: template.slug, isFavorite: true },
    { status: created ? 201 : 200 }
  );
}

export async function removeFavorite(req, res) {
  const template = await findTemplateOr404(req.valid.params.templateId, { includeUnpublished: true });
  const { deletedCount } = await Favorite.deleteOne({ user: req.user._id, template: template._id });
  if (deletedCount) {
    await Template.updateOne({ _id: template._id, favoritesCount: { $gt: 0 } }, { $inc: { favoritesCount: -1 } });
  }
  sendSuccess(res, { templateId: template.id, slug: template.slug, isFavorite: false });
}

export async function syncFavorites(req, res) {
  const keys = [...new Set(req.body.templateIds)];
  const ids = keys.filter((k) => /^[a-f\d]{24}$/i.test(k) && mongoose.isValidObjectId(k));
  const slugs = keys.filter((k) => !ids.includes(k)).map((k) => k.toLowerCase());

  const templates = await Template.find({
    isPublished: true,
    $or: [{ _id: { $in: ids } }, { slug: { $in: slugs } }]
  }).select('_id');

  let added = 0;
  if (templates.length) {
    const result = await Favorite.bulkWrite(
      templates.map((t) => ({
        updateOne: {
          filter: { user: req.user._id, template: t._id },
          update: { $setOnInsert: { user: req.user._id, template: t._id } },
          upsert: true
        }
      })),
      { ordered: false }
    );
    added = result.upsertedCount;
    // upsertedIds is keyed by operation index, which maps back to `templates`
    const newTemplateIds = Object.keys(result.upsertedIds).map((idx) => templates[Number(idx)]._id);
    if (newTemplateIds.length) {
      await Template.updateMany({ _id: { $in: newTemplateIds } }, { $inc: { favoritesCount: 1 } });
    }
  }

  sendSuccess(res, { requested: keys.length, matched: templates.length, added, unknown: keys.length - templates.length });
}

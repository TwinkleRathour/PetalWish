import { Template, Favorite } from '../models/index.js';
import { sendSuccess, paginate, paginationMeta, escapeRegex } from '../utils/response.js';
import { findTemplateOr404 } from '../services/template.service.js';
import { ApiError } from '../utils/ApiError.js';

const SORTS = {
  featured: { sortOrder: 1, createdAt: -1, _id: 1 },
  newest: { createdAt: -1, _id: 1 },
  oldest: { createdAt: 1, _id: 1 },
  popular: { favoritesCount: -1, usageCount: -1, _id: 1 },
  title: { title: 1, _id: 1 }
};

function isAdmin(req) {
  return req.user?.role === 'admin';
}

/**
 * Adds per-user flags to each template:
 *   isFavorite – the user has favourited it
 *   isOwned    – free, or a premium template the user has purchased (false = show a lock)
 */
async function withUserFlags(req, templates) {
  const json = templates.map((t) => t.toJSON());
  if (!req.user) return json.map((t) => ({ ...t, isFavorite: false, isOwned: !t.isPremium }));
  if (!json.length) return json;

  const favs = await Favorite.find({ user: req.user._id, template: { $in: templates.map((t) => t._id) } })
    .select('template')
    .lean();
  const favIds = new Set(favs.map((f) => f.template.toString()));
  const owned = new Set((req.user.purchasedTemplates || []).map((id) => id.toString()));
  return json.map((t) => ({ ...t, isFavorite: favIds.has(t.id), isOwned: !t.isPremium || owned.has(t.id) }));
}

export async function listTemplates(req, res) {
  const { q, category, style, color, orientation, tag, premium, trending, includeElements, sort } = req.valid.query;
  const filter = {};

  if (!isAdmin(req)) filter.isPublished = true;
  if (category && category !== 'All') filter.category = category;
  if (orientation && orientation !== 'All') filter.orientation = orientation;
  if (style && style !== 'All') filter.style = new RegExp(`^${escapeRegex(style)}$`, 'i');
  if (color && color !== 'All') filter.color = new RegExp(`^${escapeRegex(color)}$`, 'i');
  if (tag) filter.tags = tag;
  if (premium !== undefined) filter.isPremium = premium;
  if (trending !== undefined) filter.isTrending = trending;
  if (q) {
    // Substring match, same behaviour as the existing frontend search box
    const rx = new RegExp(escapeRegex(q), 'i');
    filter.$or = [{ title: rx }, { tags: rx }, { category: rx }, { style: rx }, { color: rx }, { description: rx }];
  }

  const page = paginate(req.valid.query);
  const projection = includeElements ? {} : { elements: 0 };
  const [templates, total] = await Promise.all([
    Template.find(filter, projection).sort(SORTS[sort]).skip(page.skip).limit(page.limit),
    Template.countDocuments(filter)
  ]);

  sendSuccess(res, await withUserFlags(req, templates), { meta: paginationMeta(page, total) });
}

/** Distinct filter values with counts, to build the filter sidebar/chips. */
export async function getFilters(req, res) {
  const match = isAdmin(req) ? {} : { isPublished: true };
  const facet = (field) => [{ $group: { _id: `$${field}`, count: { $sum: 1 } } }, { $sort: { _id: 1 } }];

  const [result] = await Template.aggregate([
    { $match: match },
    {
      $facet: {
        categories: facet('category'),
        styles: facet('style'),
        colors: facet('color'),
        orientations: facet('orientation'),
        total: [{ $count: 'value' }]
      }
    }
  ]);

  const clean = (rows) => rows.filter((r) => r._id).map((r) => ({ value: r._id, count: r.count }));
  sendSuccess(res, {
    total: result.total[0]?.value ?? 0,
    categories: clean(result.categories),
    styles: clean(result.styles),
    colors: clean(result.colors),
    orientations: clean(result.orientations)
  });
}

export async function getTemplate(req, res) {
  const template = await findTemplateOr404(req.valid.params.id, { includeUnpublished: isAdmin(req) });
  const [json] = await withUserFlags(req, [template]);
  sendSuccess(res, json);
}

// ----- Admin -----

export async function createTemplate(req, res) {
  const template = await Template.create({ ...req.body, createdBy: req.user._id });
  sendSuccess(res, template, { status: 201 });
}

export async function updateTemplate(req, res) {
  const template = await findTemplateOr404(req.valid.params.id, { includeUnpublished: true });
  template.set(req.body);
  if (template.isPremium && !template.price) {
    throw ApiError.validation([{ location: 'body', field: 'price', message: 'Premium templates must have a price' }]);
  }
  await template.save();
  sendSuccess(res, template);
}

export async function deleteTemplate(req, res) {
  const template = await findTemplateOr404(req.valid.params.id, { includeUnpublished: true });
  await Promise.all([template.deleteOne(), Favorite.deleteMany({ template: template._id })]);
  sendSuccess(res, { id: template.id, deleted: true });
}

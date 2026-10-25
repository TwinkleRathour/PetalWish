import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';
import { Template } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';

const SEED_FILE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../data/templates.json');

/** Builds a query that matches a template by ObjectId or by slug. */
export function templateLookup(idOrSlug) {
  return mongoose.isValidObjectId(idOrSlug) && /^[a-f\d]{24}$/i.test(idOrSlug)
    ? { _id: idOrSlug }
    : { slug: idOrSlug.toLowerCase() };
}

export async function findTemplateOr404(idOrSlug, { includeUnpublished = false } = {}) {
  const filter = templateLookup(idOrSlug);
  if (!includeUnpublished) filter.isPublished = true;
  const template = await Template.findOne(filter);
  if (!template) throw ApiError.notFound('Template not found', { code: 'TEMPLATE_NOT_FOUND' });
  return template;
}

export async function loadSeedTemplates() {
  return JSON.parse(await fs.readFile(SEED_FILE, 'utf8'));
}

/**
 * Upserts the bundled template catalogue (data/templates.json) by slug.
 * Existing documents keep their counters (favoritesCount, usageCount).
 */
export async function seedTemplates() {
  const templates = await loadSeedTemplates();
  if (!templates.length) return { upserted: 0, modified: 0, total: 0 };

  const ops = templates.map((t) => ({
    updateOne: { filter: { slug: t.slug }, update: { $set: t }, upsert: true }
  }));
  const result = await Template.bulkWrite(ops, { ordered: false });
  return { upserted: result.upsertedCount, modified: result.modifiedCount, total: templates.length };
}

export async function seedTemplatesIfEmpty() {
  if ((await Template.estimatedDocumentCount()) > 0) return null;
  return seedTemplates();
}

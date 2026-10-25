import { z } from 'zod';
import { SURFACE_KEYS } from '../models/index.js';
import { background, canvasElement, idOrSlug, pagination } from './common.js';

const elements = z.array(canvasElement).max(500, 'A design can have at most 500 elements');

const surface = z.object({ bg: background, elements }).strict();

const surfaces = z
  .record(z.string(), surface)
  .refine((obj) => Object.keys(obj).every((k) => SURFACE_KEYS.includes(k)), {
    message: `Surfaces may only be: ${SURFACE_KEYS.join(', ')}`
  });

const thumbnail = z
  .string()
  .max(2_000_000, 'Thumbnail is too large (max ~1.5 MB)')
  .refine((v) => v === '' || /^data:image\/(png|jpe?g|webp);base64,/.test(v) || /^https?:\/\//.test(v), {
    message: 'Thumbnail must be an image data URL or an http(s) URL'
  });

const designFields = z.object({
  title: z.string().trim().min(1, 'Title is required').max(120),
  category: z.string().trim().max(60),
  bg: background,
  elements,
  surfaces,
  thumbnail,
  status: z.enum(['draft', 'final'])
});

export const createDesignSchema = designFields
  .partial()
  .extend({
    // Template id or slug to start from; bg/elements are copied from it when not provided
    templateId: idOrSlug.optional()
  })
  .strict()
  .refine((v) => v.templateId || v.bg, {
    message: 'Provide a background (bg) or a templateId to start from',
    path: ['bg']
  });

export const updateDesignSchema = designFields
  .partial()
  .strict()
  .refine((v) => Object.keys(v).length > 0, 'Provide at least one field to update');

export const listDesignsQuery = z.object({
  q: z.string().trim().max(100).optional(),
  status: z.enum(['draft', 'final']).optional(),
  sort: z.enum(['updated', 'created', 'title']).default('updated'),
  ...pagination
});

export const duplicateDesignSchema = z
  .object({ title: z.string().trim().min(1).max(120).optional() })
  .strict();

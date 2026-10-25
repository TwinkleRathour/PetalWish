import { z } from 'zod';
import { TEMPLATE_CATEGORIES, TEMPLATE_ORIENTATIONS } from '../models/index.js';
import { pagination, background, canvasElement, slug, idOrSlug } from './common.js';

const booleanString = z.enum(['true', 'false']).transform((v) => v === 'true');

export const listTemplatesQuery = z.object({
  q: z.string().trim().max(100).optional(),
  category: z.enum([...TEMPLATE_CATEGORIES, 'All']).optional(),
  style: z.string().trim().max(40).optional(),
  color: z.string().trim().max(40).optional(),
  orientation: z.enum([...TEMPLATE_ORIENTATIONS, 'All']).optional(),
  tag: z.string().trim().toLowerCase().max(40).optional(),
  premium: booleanString.optional(),
  trending: booleanString.optional(),
  // Set to false for lightweight listings without canvas elements
  includeElements: booleanString.default(true),
  sort: z.enum(['featured', 'newest', 'oldest', 'popular', 'title']).default('featured'),
  ...pagination,
  limit: z.coerce.number().int().min(1).max(100).default(50)
});

export const templateParams = z.object({ id: idOrSlug });

// Field rules without defaults, so partial updates never overwrite fields that were not sent
const templateFields = z.object({
  slug,
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(1000),
  category: z.enum(TEMPLATE_CATEGORIES),
  style: z.string().trim().max(40),
  color: z.string().trim().max(40),
  orientation: z.enum(TEMPLATE_ORIENTATIONS),
  tags: z.array(z.string().trim().toLowerCase().min(1).max(40)).max(30),
  bg: background,
  elements: z.array(canvasElement).max(300),
  thumbnailUrl: z.url().max(2048),
  isPremium: z.boolean(),
  price: z.number().int('Price must be in paise (whole number)').min(0),
  currency: z.string().length(3).toUpperCase(),
  isPublished: z.boolean(),
  isTrending: z.boolean(),
  sortOrder: z.number().int().min(0).max(100000)
});

const premiumNeedsPrice = [
  (v) => !v.isPremium || (v.price ?? 0) > 0,
  { message: 'Premium templates must have a price', path: ['price'] }
];

export const createTemplateSchema = templateFields
  .partial({ description: true, style: true, color: true, thumbnailUrl: true, sortOrder: true })
  .extend({
    orientation: templateFields.shape.orientation.default('Portrait'),
    tags: templateFields.shape.tags.default([]),
    elements: templateFields.shape.elements.default([]),
    isPremium: templateFields.shape.isPremium.default(false),
    price: templateFields.shape.price.default(0),
    currency: templateFields.shape.currency.default('INR'),
    isPublished: templateFields.shape.isPublished.default(true),
    isTrending: templateFields.shape.isTrending.default(false)
  })
  .strict()
  .refine(...premiumNeedsPrice);

export const updateTemplateSchema = templateFields
  .partial()
  .strict()
  .refine((v) => Object.keys(v).length > 0, 'Provide at least one field to update');

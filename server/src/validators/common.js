import { z } from 'zod';
import mongoose from 'mongoose';

export const objectId = z
  .string()
  .trim()
  .refine((v) => mongoose.isValidObjectId(v) && /^[a-f\d]{24}$/i.test(v), 'Invalid id');

export const slug = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug')
  .max(100);

/** Accepts either a Mongo ObjectId or a template slug such as "birthday-zoe-13". */
export const idOrSlug = z.string().trim().min(1).max(100);

export const idParams = z.object({ id: objectId });

export const pagination = {
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20)
};

export const hexOrCssColor = z.string().trim().max(100);

export const background = z
  .object({
    type: z.enum(['solid', 'gradient', 'image']),
    value: z.string().max(4096).optional(),
    color1: hexOrCssColor.optional(),
    color2: hexOrCssColor.optional(),
    angle: z.number().optional()
  })
  .loose();

/** A canvas element from the editor. Core geometry is checked; extra styling props pass through. */
export const canvasElement = z
  .object({
    id: z.string().min(1).max(100),
    type: z.enum(['text', 'shape', 'image', 'svg', 'sticker', 'group']),
    x: z.number().finite(),
    y: z.number().finite(),
    width: z.number().finite().nonnegative(),
    height: z.number().finite().nonnegative(),
    rotation: z.number().finite().optional(),
    content: z.string().max(10000).optional()
  })
  .loose();

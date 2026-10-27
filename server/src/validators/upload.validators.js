import { z } from 'zod';
import { UPLOAD_KIND_VALUES } from '../models/index.js';
import { pagination } from './common.js';

export const listUploadsQuery = z.object({
  kind: z.enum(UPLOAD_KIND_VALUES).optional(),
  ...pagination
});

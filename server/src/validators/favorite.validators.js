import { z } from 'zod';
import { idOrSlug, pagination } from './common.js';

export const favoriteParams = z.object({ templateId: idOrSlug });

export const listFavoritesQuery = z.object({ ...pagination, limit: pagination.limit.default(50) });

// Imports favourites kept in localStorage by the old frontend (template slugs or ids)
export const syncFavoritesSchema = z
  .object({ templateIds: z.array(idOrSlug).max(500) })
  .strict();

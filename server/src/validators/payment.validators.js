import { z } from 'zod';
import { PAYMENT_STATUSES } from '../models/index.js';
import { pagination, objectId } from './common.js';

export const listPaymentsQuery = z.object({
  status: z.enum(PAYMENT_STATUSES).optional(),
  ...pagination
});

export const adminListPaymentsQuery = listPaymentsQuery.extend({
  userId: objectId.optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional()
});

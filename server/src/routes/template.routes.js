import { Router } from 'express';
import * as templates from '../controllers/template.controller.js';
import { optionalAuth, requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  listTemplatesQuery,
  templateParams,
  createTemplateSchema,
  updateTemplateSchema
} from '../validators/template.validators.js';

const router = Router();
const adminOnly = [requireAuth, requireRole('admin')];

// Public (signed-in users additionally get `isFavorite` on each template)
router.get('/', optionalAuth, validate({ query: listTemplatesQuery }), templates.listTemplates);
router.get('/filters', optionalAuth, templates.getFilters);
router.get('/:id', optionalAuth, validate({ params: templateParams }), templates.getTemplate);

// Admin catalogue management
router.post('/', ...adminOnly, validate({ body: createTemplateSchema }), templates.createTemplate);
router.patch(
  '/:id',
  ...adminOnly,
  validate({ params: templateParams, body: updateTemplateSchema }),
  templates.updateTemplate
);
router.delete('/:id', ...adminOnly, validate({ params: templateParams }), templates.deleteTemplate);

export default router;

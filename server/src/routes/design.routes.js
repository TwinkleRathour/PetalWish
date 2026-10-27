import { Router } from 'express';
import * as designs from '../controllers/design.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { uploadImage } from '../middleware/upload.js';
import { idParams } from '../validators/common.js';
import {
  createDesignSchema,
  updateDesignSchema,
  listDesignsQuery,
  duplicateDesignSchema
} from '../validators/design.validators.js';

const router = Router();
router.use(requireAuth);

router.get('/', validate({ query: listDesignsQuery }), designs.listDesigns);
router.post('/', validate({ body: createDesignSchema }), designs.createDesign);
router.get('/:id', validate({ params: idParams }), designs.getDesign);
router.patch('/:id', validate({ params: idParams, body: updateDesignSchema }), designs.updateDesign);
router.delete('/:id', validate({ params: idParams }), designs.deleteDesign);
router.post('/:id/duplicate', validate({ params: idParams, body: duplicateDesignSchema }), designs.duplicateDesign);
router.put('/:id/thumbnail', validate({ params: idParams }), uploadImage('design-thumbnail'), designs.uploadThumbnail);

export default router;

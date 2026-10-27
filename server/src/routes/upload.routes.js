import { Router } from 'express';
import * as uploads from '../controllers/upload.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { uploadImage } from '../middleware/upload.js';
import { idParams } from '../validators/common.js';
import { listUploadsQuery } from '../validators/upload.validators.js';

const router = Router();
// Authentication runs before multer, so anonymous requests never write to disk
router.use(requireAuth);

// multipart/form-data with the file in the field "image"
router.post('/images', uploadImage('design-image'), uploads.uploadDesignImage);
router.get('/', validate({ query: listUploadsQuery }), uploads.listMyUploads);
router.get('/:id', validate({ params: idParams }), uploads.getUpload);
router.delete('/:id', validate({ params: idParams }), uploads.removeUpload);

export default router;

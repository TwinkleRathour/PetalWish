import { Router } from 'express';
import * as auth from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiters.js';
import { uploadImage } from '../middleware/upload.js';
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema
} from '../validators/auth.validators.js';

const router = Router();

router.post('/register', authLimiter, validate({ body: registerSchema }), auth.register);
router.post('/login', authLimiter, validate({ body: loginSchema }), auth.login);

router.get('/me', requireAuth, auth.me);
router.patch('/me', requireAuth, validate({ body: updateProfileSchema }), auth.updateProfile);
router.patch('/me/password', requireAuth, validate({ body: changePasswordSchema }), auth.changePassword);
router.put('/me/avatar', requireAuth, uploadImage('avatar'), auth.uploadAvatar);
router.delete('/me/avatar', requireAuth, auth.removeAvatar);
router.post('/logout-all', requireAuth, auth.logoutAll);

export default router;

import { Router } from 'express';
import mongoose from 'mongoose';
import authRoutes from './auth.routes.js';
import templateRoutes from './template.routes.js';
import designRoutes from './design.routes.js';
import favoriteRoutes from './favorite.routes.js';
import paymentRoutes from './payment.routes.js';
import uploadRoutes from './upload.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const db = dbStates[mongoose.connection.readyState] ?? 'unknown';
  res.status(db === 'connected' ? 200 : 503).json({
    success: db === 'connected',
    data: { status: db === 'connected' ? 'ok' : 'degraded', db, uptime: Math.round(process.uptime()) }
  });
});

router.use('/auth', authRoutes);
router.use('/templates', templateRoutes);
router.use('/designs', designRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/payments', paymentRoutes);
router.use('/uploads', uploadRoutes);

export default router;

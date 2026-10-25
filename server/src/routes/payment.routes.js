import { Router } from 'express';
import * as payments from '../controllers/payment.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { idParams } from '../validators/common.js';
import { listPaymentsQuery, adminListPaymentsQuery } from '../validators/payment.validators.js';

/*
 * Payment history (read-only). The Razorpay module adds its own routes here, e.g.
 *   POST /api/payments/orders   -> buildTemplateItems + razorpay.orders.create + createPaymentRecord
 *   POST /api/payments/verify   -> verify signature + markPaymentPaid / markPaymentFailed
 *   POST /api/payments/webhook  -> verify webhook signature + markPayment* (needs the raw body)
 * using the helpers in services/payment.service.js.
 */
const router = Router();
router.use(requireAuth);

router.get('/', validate({ query: listPaymentsQuery }), payments.listMyPayments);
router.get('/summary', payments.getMyPaymentSummary);
router.get('/admin/all', requireRole('admin'), validate({ query: adminListPaymentsQuery }), payments.adminListPayments);
router.get('/:id', validate({ params: idParams }), payments.getMyPayment);

export default router;

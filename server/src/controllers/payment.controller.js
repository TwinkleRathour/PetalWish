import { Payment } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { sendSuccess, paginate, paginationMeta } from '../utils/response.js';

// Raw Razorpay payloads are kept for auditing but are not sent to the browser
const PUBLIC_PROJECTION = { 'events.payload': 0 };

async function summarize(match) {
  const rows = await Payment.aggregate([
    { $match: match },
    { $group: { _id: '$status', count: { $sum: 1 }, amount: { $sum: '$amount' } } }
  ]);
  const byStatus = Object.fromEntries(rows.map((r) => [r._id, { count: r.count, amount: r.amount }]));
  return {
    totalPaid: byStatus.paid?.amount ?? 0,
    totalRefunded: byStatus.refunded?.amount ?? 0,
    currency: 'INR',
    byStatus
  };
}

export async function listMyPayments(req, res) {
  const filter = { userId: req.user._id };
  if (req.valid.query.status) filter.status = req.valid.query.status;
  const page = paginate(req.valid.query);

  const [payments, total] = await Promise.all([
    Payment.find(filter, PUBLIC_PROJECTION).sort({ createdAt: -1, _id: 1 }).skip(page.skip).limit(page.limit),
    Payment.countDocuments(filter)
  ]);
  sendSuccess(res, payments, { meta: paginationMeta(page, total) });
}

export async function getMyPaymentSummary(req, res) {
  sendSuccess(res, await summarize({ userId: req.user._id }));
}

export async function getMyPayment(req, res) {
  const payment = await Payment.findOne({ _id: req.valid.params.id, userId: req.user._id }, PUBLIC_PROJECTION).populate(
    'items.template',
    'slug title thumbnailUrl category'
  );
  if (!payment) throw ApiError.notFound('Payment not found', { code: 'PAYMENT_NOT_FOUND' });
  sendSuccess(res, payment);
}

// ----- Admin -----

export async function adminListPayments(req, res) {
  const { status, userId, from, to } = req.valid.query;
  const filter = {};
  if (status) filter.status = status;
  if (userId) filter.userId = userId;
  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = from;
    if (to) filter.createdAt.$lte = to;
  }
  const page = paginate(req.valid.query);

  const [payments, total, summary] = await Promise.all([
    Payment.find(filter).sort({ createdAt: -1, _id: 1 }).skip(page.skip).limit(page.limit).populate('userId', 'name email'),
    Payment.countDocuments(filter),
    summarize(filter)
  ]);
  sendSuccess(res, payments, { meta: { ...paginationMeta(page, total), summary } });
}

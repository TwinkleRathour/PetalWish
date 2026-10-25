/**
 * Database layer for payments. The Razorpay module (Member 2) should call these
 * functions instead of touching the Payment model directly:
 *
 *   const items = await buildTemplateItems(req.user, ['wedding-floral-arch']);
 *   const order = await razorpay.orders.create({ amount: totalOf(items), currency: 'INR', receipt });
 *   const payment = await createPaymentRecord({ user: req.user, order, items });
 *   ...after checkout / signature verification...
 *   await markPaymentPaid({ razorpay_order_id, razorpay_payment_id, razorpay_signature });
 *
 * Signature verification itself (HMAC with the Razorpay key secret) belongs to the payment module.
 */
import mongoose from 'mongoose';
import { Payment, Template, User } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { templateLookup } from './template.service.js';

export function totalOf(items) {
  return Payment.computeTotal(items);
}

/**
 * Turns template ids/slugs into payment line items using prices from the database,
 * never from the client. Rejects free templates and templates the user already owns.
 */
export async function buildTemplateItems(user, templateKeys) {
  const keys = [...new Set(templateKeys)];
  if (!keys.length) throw ApiError.badRequest('Select at least one template to purchase');

  const templates = await Template.find({
    isPublished: true,
    $or: keys.map((k) => templateLookup(k))
  });

  if (templates.length !== keys.length) {
    throw ApiError.notFound('One or more templates were not found', { code: 'TEMPLATE_NOT_FOUND' });
  }

  const owned = new Set((user.purchasedTemplates || []).map((id) => id.toString()));
  for (const t of templates) {
    if (!t.isPremium || t.price <= 0) {
      throw ApiError.badRequest(`"${t.title}" is free and does not need to be purchased`, { code: 'TEMPLATE_FREE' });
    }
    if (owned.has(t.id)) {
      throw ApiError.conflict(`You already own "${t.title}"`, { code: 'ALREADY_PURCHASED' });
    }
  }

  return templates.map((t) => ({
    kind: 'template',
    template: t._id,
    sku: t.slug,
    name: t.title,
    unitPrice: t.price,
    quantity: 1
  }));
}

/** Stores a freshly created Razorpay order (status "created"). */
export async function createPaymentRecord({ user, order, items, notes }) {
  const payment = new Payment({
    razorpay_order_id: order.id,
    amount: order.amount,
    currency: order.currency || 'INR',
    receipt: order.receipt,
    userId: user._id,
    email: user.email,
    items,
    notes
  });
  payment.transition('created', { source: 'api', note: 'Order created', payload: order });
  await payment.save();
  return payment;
}

async function findByOrderId(razorpay_order_id) {
  const payment = await Payment.findOne({ razorpay_order_id });
  if (!payment) throw ApiError.notFound('Payment order not found', { code: 'PAYMENT_NOT_FOUND' });
  return payment;
}

/** Records that checkout was opened / a payment attempt started. */
export async function markPaymentAttempted({ razorpay_order_id, payload, source = 'checkout' }) {
  const payment = await findByOrderId(razorpay_order_id);
  if (payment.status === 'paid' || payment.status === 'refunded') return payment;
  payment.attempts += 1;
  payment.transition('attempted', { source, payload });
  await payment.save();
  return payment;
}

/**
 * Marks an order as paid and unlocks the purchased templates. Idempotent: calling it again
 * (e.g. both the checkout handler and the `payment.captured` webhook) changes nothing.
 * Call ONLY after verifying the Razorpay signature.
 */
export async function markPaymentPaid({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  method,
  contact,
  payload,
  source = 'checkout',
  event
}) {
  const session = await mongoose.startSession();
  try {
    let payment;
    await session.withTransaction(async () => {
      payment = await Payment.findOne({ razorpay_order_id }).session(session);
      if (!payment) throw ApiError.notFound('Payment order not found', { code: 'PAYMENT_NOT_FOUND' });

      if (payment.status === 'paid' || payment.status === 'refunded') {
        if (payment.razorpay_payment_id && payment.razorpay_payment_id !== razorpay_payment_id) {
          throw ApiError.conflict('This order was already paid with a different payment', {
            code: 'ORDER_ALREADY_PAID'
          });
        }
        return;
      }

      payment.razorpay_payment_id = razorpay_payment_id;
      if (razorpay_signature) payment.razorpay_signature = razorpay_signature;
      if (method) payment.method = method;
      if (contact) payment.contact = contact;
      payment.failure = undefined;
      payment.transition('paid', { source, event, payload });
      await payment.save({ session });

      const templateIds = payment.items.filter((i) => i.template).map((i) => i.template);
      if (templateIds.length) {
        await User.updateOne(
          { _id: payment.userId },
          { $addToSet: { purchasedTemplates: { $each: templateIds } } },
          { session }
        );
      }
    });
    return payment;
  } finally {
    await session.endSession();
  }
}

/** Marks an order as failed (does nothing if it was already paid). */
export async function markPaymentFailed({ razorpay_order_id, razorpay_payment_id, error = {}, payload, source = 'checkout', event }) {
  const payment = await findByOrderId(razorpay_order_id);
  if (payment.status === 'paid' || payment.status === 'refunded') return payment;

  if (razorpay_payment_id) payment.razorpay_payment_id = razorpay_payment_id;
  payment.failure = {
    code: error.code,
    description: error.description,
    reason: error.reason,
    source: error.source,
    step: error.step
  };
  payment.transition('failed', { source, event, note: error.description, payload });
  await payment.save();
  return payment;
}

/** Records a refund. A full refund also removes the templates from the user's purchases. */
export async function markPaymentRefunded({ razorpay_order_id, razorpay_refund_id, amount, reason, payload, source = 'webhook', event }) {
  const payment = await findByOrderId(razorpay_order_id);
  if (payment.status !== 'paid' && payment.status !== 'refunded') {
    throw ApiError.badRequest('Only paid orders can be refunded', { code: 'NOT_REFUNDABLE' });
  }

  const refundAmount = amount ?? payment.amount;
  payment.refund = { razorpay_refund_id, amount: refundAmount, reason, refundedAt: new Date() };
  payment.transition('refunded', { source, event, note: reason, payload });
  await payment.save();

  if (refundAmount >= payment.amount) {
    const templateIds = payment.items.filter((i) => i.template).map((i) => i.template);
    await User.updateOne({ _id: payment.userId }, { $pull: { purchasedTemplates: { $in: templateIds } } });
  }
  return payment;
}

export function userOwnsTemplate(user, template) {
  if (!template.isPremium) return true;
  return (user?.purchasedTemplates || []).some((id) => id.toString() === template._id.toString());
}

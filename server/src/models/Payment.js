import mongoose from 'mongoose';

/**
 * Payment / transaction record for Razorpay.
 *
 * Lifecycle (status):
 *   created   -> Razorpay order created, user has not paid yet
 *   attempted -> checkout opened / payment attempted but not captured
 *   paid      -> signature verified (or `payment.captured` webhook received)
 *   failed    -> payment failed or was cancelled
 *   refunded  -> amount refunded (fully or partially, see refund.amount)
 *
 * Amounts are stored as integers in the smallest currency unit (paise for INR),
 * exactly as Razorpay expects them.
 */
export const PAYMENT_STATUSES = ['created', 'attempted', 'paid', 'failed', 'refunded'];

const paymentItemSchema = new mongoose.Schema(
  {
    // A purchasable product; today that is a premium template, `kind` leaves room for more
    kind: { type: String, enum: ['template', 'plan', 'other'], default: 'template' },
    template: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' },
    sku: { type: String, trim: true }, // e.g. template slug or plan code
    name: { type: String, required: true, trim: true, maxlength: 200 },
    unitPrice: { type: Number, required: true, min: 0 }, // paise
    quantity: { type: Number, default: 1, min: 1 }
  },
  { _id: false }
);

// One entry per status change / webhook, giving a full transaction trail
const paymentEventSchema = new mongoose.Schema(
  {
    status: { type: String, enum: PAYMENT_STATUSES, required: true },
    source: { type: String, enum: ['api', 'checkout', 'webhook', 'admin', 'system'], default: 'api' },
    event: String, // e.g. "payment.captured"
    note: String,
    payload: mongoose.Schema.Types.Mixed, // raw Razorpay payload, for auditing
    at: { type: Date, default: Date.now }
  },
  { _id: false }
);

const paymentSchema = new mongoose.Schema(
  {
    // --- Fields required by the payment module spec ---
    razorpay_order_id: { type: String, required: true, unique: true, trim: true },
    razorpay_payment_id: { type: String, trim: true }, // set once the user pays
    amount: { type: Number, required: true, min: 0 }, // total, in paise
    status: { type: String, enum: PAYMENT_STATUSES, default: 'created', index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: {
      type: [paymentItemSchema],
      validate: [(v) => Array.isArray(v) && v.length > 0, 'A payment must contain at least one item']
    },
    // createdAt / updatedAt come from { timestamps: true }

    // --- Supporting fields for a complete transaction record ---
    razorpay_signature: { type: String, trim: true, select: false },
    currency: { type: String, default: 'INR', uppercase: true },
    receipt: { type: String, trim: true }, // our own reference sent to Razorpay
    method: { type: String, trim: true }, // card, upi, netbanking, wallet…
    email: { type: String, trim: true, lowercase: true },
    contact: { type: String, trim: true },
    amountPaid: { type: Number, default: 0, min: 0 },
    attempts: { type: Number, default: 0, min: 0 },
    failure: {
      code: String,
      description: String,
      reason: String,
      source: String,
      step: String
    },
    refund: {
      razorpay_refund_id: String,
      amount: { type: Number, min: 0 },
      reason: String,
      refundedAt: Date
    },
    paidAt: Date,
    notes: { type: Map, of: String },
    events: { type: [paymentEventSchema], default: [] }
  },
  { timestamps: true }
);

// A Razorpay payment id can only belong to one record (sparse: unpaid orders have none)
paymentSchema.index({ razorpay_payment_id: 1 }, { unique: true, sparse: true });
paymentSchema.index({ userId: 1, createdAt: -1 });

paymentSchema.virtual('amountInRupees').get(function amountInRupees() {
  return this.amount / 100;
});

/** Total of all items, used to make sure `amount` matches what is being bought. */
paymentSchema.statics.computeTotal = function computeTotal(items = []) {
  return items.reduce((sum, item) => sum + item.unitPrice * (item.quantity || 1), 0);
};

paymentSchema.pre('validate', function checkAmount() {
  if (this.items?.length && this.amount !== this.constructor.computeTotal(this.items)) {
    this.invalidate('amount', 'Amount must equal the sum of item prices');
  }
});

/** Record a status change together with an audit event. */
paymentSchema.methods.transition = function transition(status, { source = 'api', event, note, payload } = {}) {
  this.status = status;
  this.events.push({ status, source, event, note, payload });
  if (status === 'paid' && !this.paidAt) {
    this.paidAt = new Date();
    this.amountPaid = this.amount;
  }
  return this;
};

paymentSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.razorpay_signature;
    return ret;
  }
});

export const Payment = mongoose.model('Payment', paymentSchema);

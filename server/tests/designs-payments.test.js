import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { setup, teardown, registerUser } from './helpers.js';

let api;
let models;
before(async () => ({ api, models } = await setup()));
after(teardown);

const blank = {
  title: 'Blank Card',
  bg: { type: 'solid', value: '#FFFFFF' },
  elements: [{ id: 'el-a', type: 'text', content: 'Hello', fontSize: 24, x: 10, y: 10, width: 200, height: 40, rotation: 0 }]
};

describe('designs', () => {
  test('requires authentication', async () => {
    assert.equal((await api.get('/api/designs')).status, 401);
  });

  test('creates a design from a template and copies its canvas', async () => {
    const { auth } = await registerUser(api);
    const res = await api.post('/api/designs').set('Authorization', auth).send({ templateId: 'birthday-zoe-13' });
    assert.equal(res.status, 201);
    assert.equal(res.body.data.title, 'Zoe Turns 13 Invite');
    assert.equal(res.body.data.templateSlug, 'birthday-zoe-13');
    assert.equal(res.body.data.elements.length, 4);

    const tpl = await api.get('/api/templates/birthday-zoe-13');
    assert.equal(tpl.body.data.usageCount, 1);
  });

  test('full CRUD on own designs, with surfaces', async () => {
    const { auth } = await registerUser(api);
    const created = await api
      .post('/api/designs')
      .set('Authorization', auth)
      .send({ ...blank, surfaces: { front: { bg: blank.bg, elements: blank.elements }, back: { bg: blank.bg, elements: [] } } });
    assert.equal(created.status, 201);
    const id = created.body.data.id;

    const list = await api.get('/api/designs').set('Authorization', auth);
    assert.equal(list.body.meta.total, 1);
    assert.equal(list.body.data[0].elements, undefined, 'listing omits heavy canvas data');

    const moved = { ...blank.elements[0], x: 99, content: 'Moved' };
    const updated = await api
      .patch(`/api/designs/${id}`)
      .set('Authorization', auth)
      .send({ title: 'Renamed', elements: [moved], status: 'final' });
    assert.equal(updated.status, 200);

    const fetched = await api.get(`/api/designs/${id}`).set('Authorization', auth);
    assert.equal(fetched.body.data.title, 'Renamed');
    assert.equal(fetched.body.data.elements[0].x, 99);
    assert.equal(fetched.body.data.elements[0].fontSize, 24, 'extra element props are preserved');
    assert.ok(fetched.body.data.surfaces.back);

    const copy = await api.post(`/api/designs/${id}/duplicate`).set('Authorization', auth);
    assert.equal(copy.status, 201);
    assert.equal(copy.body.data.title, 'Renamed (copy)');
    assert.equal(copy.body.data.status, 'draft');

    assert.equal((await api.delete(`/api/designs/${id}`).set('Authorization', auth)).status, 200);
    assert.equal((await api.get(`/api/designs/${id}`).set('Authorization', auth)).status, 404);
  });

  test("users cannot see or edit other users' designs", async () => {
    const alice = await registerUser(api);
    const bob = await registerUser(api);
    const { body } = await api.post('/api/designs').set('Authorization', alice.auth).send(blank);

    assert.equal((await api.get(`/api/designs/${body.data.id}`).set('Authorization', bob.auth)).status, 404);
    assert.equal(
      (await api.patch(`/api/designs/${body.data.id}`).set('Authorization', bob.auth).send({ title: 'x' })).status,
      404
    );
    assert.equal((await api.delete(`/api/designs/${body.data.id}`).set('Authorization', bob.auth)).status, 404);
    assert.equal((await api.get('/api/designs').set('Authorization', bob.auth)).body.meta.total, 0);
  });

  test('validates design payloads', async () => {
    const { auth } = await registerUser(api);
    assert.equal((await api.post('/api/designs').set('Authorization', auth).send({ title: 'No bg' })).status, 422);
    assert.equal(
      (await api.post('/api/designs').set('Authorization', auth).send({ ...blank, elements: [{ id: 'x', type: 'text' }] }))
        .status,
      422
    );
    assert.equal(
      (await api.post('/api/designs').set('Authorization', auth).send({ ...blank, surfaces: { attic: { bg: blank.bg, elements: [] } } }))
        .status,
      422
    );
    assert.equal((await api.get('/api/designs/not-an-id').set('Authorization', auth)).status, 422);
    assert.equal((await api.post('/api/designs').set('Authorization', auth).send({ ...blank, owner: 'x' })).status, 422);
  });
});

describe('payments (database layer)', () => {
  let svc;
  before(async () => {
    svc = await import('../src/services/payment.service.js');
  });

  test('stores an order, marks it paid idempotently and unlocks the template', async () => {
    const { auth, user } = await registerUser(api);
    const dbUser = await models.User.findById(user.id);

    const items = await svc.buildTemplateItems(dbUser, ['wedding-luxury']);
    assert.equal(items[0].unitPrice, 9900);

    const order = { id: 'order_TEST123', amount: svc.totalOf(items), currency: 'INR', receipt: 'rcpt_1' };
    const payment = await svc.createPaymentRecord({ user: dbUser, order, items });
    assert.equal(payment.status, 'created');
    assert.equal(payment.amount, 9900);

    await svc.markPaymentAttempted({ razorpay_order_id: 'order_TEST123' });

    const paid = await svc.markPaymentPaid({
      razorpay_order_id: 'order_TEST123',
      razorpay_payment_id: 'pay_TEST123',
      razorpay_signature: 'sig',
      method: 'upi'
    });
    assert.equal(paid.status, 'paid');
    assert.ok(paid.paidAt);

    // Second call (e.g. webhook after checkout handler) is a no-op
    await svc.markPaymentPaid({ razorpay_order_id: 'order_TEST123', razorpay_payment_id: 'pay_TEST123', source: 'webhook' });
    const stored = await models.Payment.findOne({ razorpay_order_id: 'order_TEST123' });
    assert.deepEqual(
      stored.events.map((e) => e.status),
      ['created', 'attempted', 'paid']
    );

    await assert.rejects(
      svc.markPaymentPaid({ razorpay_order_id: 'order_TEST123', razorpay_payment_id: 'pay_OTHER' }),
      /different payment/
    );

    const tpl = await api.get('/api/templates/wedding-luxury').set('Authorization', auth);
    assert.equal(tpl.body.data.isOwned, true);

    // Buying it again is refused
    const owner = await models.User.findById(user.id);
    await assert.rejects(svc.buildTemplateItems(owner, ['wedding-luxury']), /already own/);

    // API: history, detail and summary — without the signature or raw payloads
    const list = await api.get('/api/payments').set('Authorization', auth);
    assert.equal(list.body.meta.total, 1);
    assert.equal(list.body.data[0].razorpay_order_id, 'order_TEST123');
    assert.equal(list.body.data[0].razorpay_payment_id, 'pay_TEST123');
    assert.equal(list.body.data[0].razorpay_signature, undefined);
    assert.equal(list.body.data[0].amountInRupees, 99);
    assert.ok(list.body.data[0].createdAt && list.body.data[0].updatedAt);

    const detail = await api.get(`/api/payments/${list.body.data[0].id}`).set('Authorization', auth);
    assert.equal(detail.body.data.items[0].template.slug, 'wedding-luxury');

    const summary = await api.get('/api/payments/summary').set('Authorization', auth);
    assert.equal(summary.body.data.totalPaid, 9900);

    // Full refund removes the purchase
    const refunded = await svc.markPaymentRefunded({ razorpay_order_id: 'order_TEST123', razorpay_refund_id: 'rfnd_1' });
    assert.equal(refunded.status, 'refunded');
    const afterRefund = await api.get('/api/templates/wedding-luxury').set('Authorization', auth);
    assert.equal(afterRefund.body.data.isOwned, false);
  });

  test('records failures and never downgrades a paid order', async () => {
    const { user } = await registerUser(api);
    const dbUser = await models.User.findById(user.id);
    const items = await svc.buildTemplateItems(dbUser, ['wedding-floral']);
    await svc.createPaymentRecord({ user: dbUser, order: { id: 'order_FAIL', amount: svc.totalOf(items) }, items });

    const failed = await svc.markPaymentFailed({
      razorpay_order_id: 'order_FAIL',
      error: { code: 'BAD_REQUEST_ERROR', description: 'Payment cancelled by user' }
    });
    assert.equal(failed.status, 'failed');
    assert.equal(failed.failure.description, 'Payment cancelled by user');

    // A retry can still succeed after a failure
    const paid = await svc.markPaymentPaid({ razorpay_order_id: 'order_FAIL', razorpay_payment_id: 'pay_RETRY' });
    assert.equal(paid.status, 'paid');
    const ignored = await svc.markPaymentFailed({ razorpay_order_id: 'order_FAIL', error: {} });
    assert.equal(ignored.status, 'paid');
  });

  test('rejects free templates, unknown templates and mismatched amounts', async () => {
    const { user } = await registerUser(api);
    const dbUser = await models.User.findById(user.id);
    await assert.rejects(svc.buildTemplateItems(dbUser, ['birthday-zoe-13']), /free/);
    await assert.rejects(svc.buildTemplateItems(dbUser, ['nope']), /not found/);

    const items = await svc.buildTemplateItems(dbUser, ['wedding-modern']);
    await assert.rejects(
      svc.createPaymentRecord({ user: dbUser, order: { id: 'order_BAD', amount: 1 }, items }),
      /Amount must equal/
    );
  });

  test('users only see their own payments; admin sees all', async () => {
    const stranger = await registerUser(api);
    const mine = await api.get('/api/payments').set('Authorization', stranger.auth);
    assert.equal(mine.body.meta.total, 0);

    const somePayment = await models.Payment.findOne();
    assert.equal((await api.get(`/api/payments/${somePayment.id}`).set('Authorization', stranger.auth)).status, 404);
    assert.equal((await api.get('/api/payments/admin/all').set('Authorization', stranger.auth)).status, 403);

    await models.User.updateOne({ _id: stranger.user.id }, { role: 'admin' });
    const all = await api.get('/api/payments/admin/all?status=paid').set('Authorization', stranger.auth);
    assert.equal(all.status, 200);
    assert.ok(all.body.meta.total >= 1);
    assert.ok(all.body.meta.summary.byStatus.paid);
  });
});

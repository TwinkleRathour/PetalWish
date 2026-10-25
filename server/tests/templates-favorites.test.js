import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { setup, teardown, registerUser } from './helpers.js';

let api;
let models;
before(async () => ({ api, models } = await setup()));
after(teardown);

async function makeAdmin() {
  const admin = await registerUser(api);
  await models.User.updateOne({ _id: admin.user.id }, { role: 'admin' });
  return admin;
}

describe('templates', () => {
  test('lists the seeded catalogue in the original order', async () => {
    const res = await api.get('/api/templates');
    assert.equal(res.status, 200);
    assert.equal(res.body.meta.total, 40);
    assert.equal(res.body.data[0].slug, 'birthday-zoe-13');
    assert.ok(Array.isArray(res.body.data[0].elements));
    assert.equal(res.body.data[0].isFavorite, false);
  });

  test('filters by category, style, colour and search text', async () => {
    const wedding = await api.get('/api/templates?category=Wedding');
    assert.ok(wedding.body.data.length > 0);
    assert.ok(wedding.body.data.every((t) => t.category === 'Wedding'));

    const pink = await api.get('/api/templates?color=pink&style=All');
    assert.ok(pink.body.data.every((t) => t.color === 'Pink'));

    const search = await api.get('/api/templates?q=zoe');
    assert.ok(search.body.data.some((t) => t.slug === 'birthday-zoe-13'));

    const regexy = await api.get('/api/templates?q=.*');
    assert.equal(regexy.status, 200);
    assert.equal(regexy.body.data.length, 0);
  });

  test('paginates and can omit elements', async () => {
    const res = await api.get('/api/templates?limit=5&page=2&includeElements=false');
    assert.equal(res.body.data.length, 5);
    assert.equal(res.body.meta.page, 2);
    assert.equal(res.body.meta.totalPages, 8);
    assert.equal(res.body.data[0].elements, undefined);
  });

  test('rejects invalid query values', async () => {
    assert.equal((await api.get('/api/templates?category=Nope')).status, 422);
    assert.equal((await api.get('/api/templates?limit=1000')).status, 422);
  });

  test('returns filter facets', async () => {
    const res = await api.get('/api/templates/filters');
    assert.equal(res.body.data.total, 40);
    assert.ok(res.body.data.categories.find((c) => c.value === 'Wedding'));
  });

  test('gets a template by slug or id', async () => {
    const bySlug = await api.get('/api/templates/birthday-zoe-13');
    assert.equal(bySlug.status, 200);
    const byId = await api.get(`/api/templates/${bySlug.body.data.id}`);
    assert.equal(byId.body.data.slug, 'birthday-zoe-13');
    assert.equal((await api.get('/api/templates/nope-nope')).status, 404);
  });

  test('premium templates are locked until purchased', async () => {
    const res = await api.get('/api/templates?premium=true');
    assert.ok(res.body.data.length > 0);
    assert.ok(res.body.data.every((t) => t.isPremium && t.price > 0 && t.isOwned === false));
  });

  test('only admins can manage templates', async () => {
    const body = {
      slug: 'diwali-lights',
      title: 'Diwali Lights',
      category: 'Party',
      bg: { type: 'solid', value: '#1A1033' },
      elements: [{ id: 'el-1', type: 'text', content: 'Happy Diwali', x: 40, y: 80, width: 420, height: 60 }]
    };

    assert.equal((await api.post('/api/templates').send(body)).status, 401);
    const user = await registerUser(api);
    assert.equal((await api.post('/api/templates').set('Authorization', user.auth).send(body)).status, 403);

    const admin = await makeAdmin();
    const created = await api.post('/api/templates').set('Authorization', admin.auth).send(body);
    assert.equal(created.status, 201);
    assert.equal(created.body.data.orientation, 'Portrait');

    const dup = await api.post('/api/templates').set('Authorization', admin.auth).send(body);
    assert.equal(dup.status, 409);

    const premiumNoPrice = await api
      .patch('/api/templates/diwali-lights')
      .set('Authorization', admin.auth)
      .send({ isPremium: true });
    assert.equal(premiumNoPrice.status, 422);

    const updated = await api
      .patch('/api/templates/diwali-lights')
      .set('Authorization', admin.auth)
      .send({ title: 'Diwali Lights Deluxe', isPremium: true, price: 4900 });
    assert.equal(updated.status, 200);
    assert.equal(updated.body.data.title, 'Diwali Lights Deluxe');
    assert.equal(updated.body.data.category, 'Party'); // untouched by the partial update

    const unpublished = await api
      .patch('/api/templates/diwali-lights')
      .set('Authorization', admin.auth)
      .send({ isPublished: false });
    assert.equal(unpublished.status, 200);
    assert.equal((await api.get('/api/templates/diwali-lights')).status, 404);

    assert.equal((await api.delete('/api/templates/diwali-lights').set('Authorization', admin.auth)).status, 200);
  });
});

describe('favorites', () => {
  test('requires authentication', async () => {
    assert.equal((await api.get('/api/favorites')).status, 401);
  });

  test('adds, lists and removes favourites idempotently', async () => {
    const { auth } = await registerUser(api);

    const first = await api.post('/api/favorites/birthday-zoe-13').set('Authorization', auth);
    assert.equal(first.status, 201);
    const again = await api.post('/api/favorites/birthday-zoe-13').set('Authorization', auth);
    assert.equal(again.status, 200);

    const list = await api.get('/api/favorites').set('Authorization', auth);
    assert.equal(list.body.data.length, 1);
    assert.equal(list.body.data[0].slug, 'birthday-zoe-13');

    const ids = await api.get('/api/favorites/ids').set('Authorization', auth);
    assert.deepEqual(ids.body.data.slugs, ['birthday-zoe-13']);

    const flagged = await api.get('/api/templates/birthday-zoe-13').set('Authorization', auth);
    assert.equal(flagged.body.data.isFavorite, true);
    assert.equal(flagged.body.data.favoritesCount, 1);

    const removed = await api.delete('/api/favorites/birthday-zoe-13').set('Authorization', auth);
    assert.equal(removed.status, 200);
    await api.delete('/api/favorites/birthday-zoe-13').set('Authorization', auth);

    const after = await api.get('/api/templates/birthday-zoe-13');
    assert.equal(after.body.data.favoritesCount, 0);
  });

  test('404s for unknown templates', async () => {
    const { auth } = await registerUser(api);
    assert.equal((await api.post('/api/favorites/not-a-template').set('Authorization', auth)).status, 404);
  });

  test('syncs favourites saved in localStorage', async () => {
    const { auth } = await registerUser(api);
    await api.post('/api/favorites/birthday-teacup').set('Authorization', auth);

    const res = await api
      .post('/api/favorites/sync')
      .set('Authorization', auth)
      .send({ templateIds: ['birthday-teacup', 'housewarming-door', 'housewarming-door', 'ghost-template'] });
    assert.equal(res.status, 200);
    assert.deepEqual(res.body.data, { requested: 3, matched: 2, added: 1, unknown: 1 });

    const door = await api.get('/api/templates/housewarming-door');
    assert.equal(door.body.data.favoritesCount, 1);
  });
});

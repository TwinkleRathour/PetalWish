import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import { setup, teardown, registerUser } from './helpers.js';

let api;
before(async () => ({ api } = await setup()));
after(teardown);

describe('auth', () => {
  test('registers a user and never returns the password', async () => {
    const res = await api
      .post('/api/auth/register')
      .send({ name: 'Elena Rostova', email: 'Elena@Example.com', password: 'petals2026' });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.token);
    assert.equal(res.body.data.tokenType, 'Bearer');
    assert.equal(res.body.data.user.email, 'elena@example.com');
    assert.equal(res.body.data.user.role, 'user');
    assert.equal(res.body.data.user.password, undefined);
    assert.equal(res.body.data.user.tokenVersion, undefined);
  });

  test('rejects duplicate emails with 409', async () => {
    const res = await api
      .post('/api/auth/register')
      .send({ name: 'Elena Again', email: 'elena@example.com', password: 'petals2026' });
    assert.equal(res.status, 409);
    assert.equal(res.body.error.code, 'EMAIL_TAKEN');
  });

  test('validates registration input', async () => {
    const res = await api.post('/api/auth/register').send({ name: 'A', email: 'not-an-email', password: 'short' });
    assert.equal(res.status, 422);
    assert.equal(res.body.error.code, 'VALIDATION_ERROR');
    const fields = res.body.error.details.map((d) => d.field);
    assert.ok(fields.includes('name'));
    assert.ok(fields.includes('email'));
    assert.ok(fields.includes('password'));
  });

  test('rejects unknown fields such as role escalation', async () => {
    const res = await api
      .post('/api/auth/register')
      .send({ name: 'Mallory', email: 'mallory@example.com', password: 'secret123', role: 'admin' });
    assert.equal(res.status, 422);
  });

  test('rejects operator injection in login', async () => {
    const res = await api.post('/api/auth/login').send({ email: { $ne: null }, password: { $ne: null } });
    assert.equal(res.status, 422);
  });

  test('logs in with correct credentials only', async () => {
    const ok = await api.post('/api/auth/login').send({ email: 'ELENA@example.com', password: 'petals2026' });
    assert.equal(ok.status, 200);
    assert.ok(ok.body.data.token);

    const bad = await api.post('/api/auth/login').send({ email: 'elena@example.com', password: 'wrong-pass1' });
    assert.equal(bad.status, 401);
    assert.equal(bad.body.error.code, 'INVALID_CREDENTIALS');

    const unknown = await api.post('/api/auth/login').send({ email: 'nobody@example.com', password: 'whatever1' });
    assert.equal(unknown.status, 401);
    assert.equal(unknown.body.error.message, bad.body.error.message);
  });

  test('protects /me and accepts a valid bearer token', async () => {
    assert.equal((await api.get('/api/auth/me')).status, 401);
    assert.equal((await api.get('/api/auth/me').set('Authorization', 'Bearer garbage')).status, 401);

    const { auth, user } = await registerUser(api);
    const res = await api.get('/api/auth/me').set('Authorization', auth);
    assert.equal(res.status, 200);
    assert.equal(res.body.data.id, user.id);
  });

  test('updates the profile', async () => {
    const { auth } = await registerUser(api);
    const res = await api.patch('/api/auth/me').set('Authorization', auth).send({ name: 'Renamed User' });
    assert.equal(res.status, 200);
    assert.equal(res.body.data.name, 'Renamed User');
  });

  test('changing the password revokes old tokens', async () => {
    const { auth, user, password } = await registerUser(api);

    const wrong = await api
      .patch('/api/auth/me/password')
      .set('Authorization', auth)
      .send({ currentPassword: 'not-it-123', newPassword: 'brandnew123' });
    assert.equal(wrong.status, 400);

    const res = await api
      .patch('/api/auth/me/password')
      .set('Authorization', auth)
      .send({ currentPassword: password, newPassword: 'brandnew123' });
    assert.equal(res.status, 200);

    assert.equal((await api.get('/api/auth/me').set('Authorization', auth)).status, 401);
    assert.equal((await api.get('/api/auth/me').set('Authorization', `Bearer ${res.body.data.token}`)).status, 200);

    const login = await api.post('/api/auth/login').send({ email: user.email, password: 'brandnew123' });
    assert.equal(login.status, 200);
  });

  test('logout-all revokes the token', async () => {
    const { auth } = await registerUser(api);
    assert.equal((await api.post('/api/auth/logout-all').set('Authorization', auth)).status, 200);
    assert.equal((await api.get('/api/auth/me').set('Authorization', auth)).status, 401);
  });
});

describe('error handling', () => {
  test('unknown API routes return a JSON 404', async () => {
    const res = await api.get('/api/does-not-exist');
    assert.equal(res.status, 404);
    assert.equal(res.body.error.code, 'ROUTE_NOT_FOUND');
  });

  test('malformed JSON returns 400', async () => {
    const res = await api.post('/api/auth/login').set('Content-Type', 'application/json').send('{"email": ');
    assert.equal(res.status, 400);
    assert.equal(res.body.error.code, 'INVALID_JSON');
  });

  test('health check reports the database', async () => {
    const res = await api.get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.data.db, 'connected');
  });

  test('does not expose server files through the static frontend', async () => {
    assert.equal((await api.get('/server/.env')).status, 404);
    assert.equal((await api.get('/server/package.json')).status, 404);
    assert.equal((await api.get('/')).status, 200);
  });
});

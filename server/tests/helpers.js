// Test harness: in-memory MongoDB replica set + the real Express app.
process.env.NODE_ENV = 'test';
process.env.BCRYPT_SALT_ROUNDS = '4';
process.env.JWT_SECRET = 'test-secret';
process.env.AUTO_SEED_TEMPLATES = 'false';

import { MongoMemoryReplSet } from 'mongodb-memory-server';
import supertest from 'supertest';

let replSet;

export async function setup() {
  replSet = await MongoMemoryReplSet.create({ replSet: { count: 1, storageEngine: 'wiredTiger' } });
  const { connectDB } = await import('../src/config/db.js');
  const { createApp } = await import('../src/app.js');
  const { seedTemplates } = await import('../src/services/template.service.js');
  const models = await import('../src/models/index.js');

  await connectDB(replSet.getUri('petalwish-test'));
  await Promise.all(Object.values(models).filter((m) => m?.syncIndexes).map((m) => m.syncIndexes()));
  await seedTemplates();

  return { api: supertest(createApp()), models };
}

export async function teardown() {
  const { disconnectDB } = await import('../src/config/db.js');
  await disconnectDB();
  await replSet?.stop();
}

let counter = 0;
/** Registers a fresh user and returns { token, user, auth } where auth is the header value. */
export async function registerUser(api, overrides = {}) {
  counter += 1;
  const body = {
    name: 'Test User',
    email: `user${counter}-${Date.now()}@example.com`,
    password: 'secret123',
    ...overrides
  };
  const res = await api.post('/api/auth/register').send(body);
  if (res.status !== 201) throw new Error(`register failed: ${res.status} ${JSON.stringify(res.body)}`);
  return { ...res.body.data, auth: `Bearer ${res.body.data.token}`, password: body.password };
}

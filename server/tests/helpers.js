// Test harness: in-memory MongoDB replica set + the real Express app.
process.env.NODE_ENV = 'test';
process.env.BCRYPT_SALT_ROUNDS = '4';
process.env.JWT_SECRET = 'test-secret';
process.env.AUTO_SEED_TEMPLATES = 'false';
process.env.SEED_DEMO_USERS = 'false';
process.env.MAX_UPLOAD_MB = '1';

import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import { MongoMemoryReplSet } from 'mongodb-memory-server';

// Each test file gets its own throw-away upload folder
export const TEST_UPLOAD_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'petalwish-uploads-'));
process.env.UPLOAD_DIR = TEST_UPLOAD_DIR;
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
  fs.rmSync(TEST_UPLOAD_DIR, { recursive: true, force: true });
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

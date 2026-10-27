import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { setup, teardown, registerUser, TEST_UPLOAD_DIR } from './helpers.js';

let api;
let models;
before(async () => ({ api, models } = await setup()));
after(teardown);

// A real 1x1 PNG
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);
const JPEG = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(64)]);

function filesIn(folder) {
  const dir = path.join(TEST_UPLOAD_DIR, folder);
  return fs.existsSync(dir) ? fs.readdirSync(dir) : [];
}

describe('uploads (multer)', () => {
  test('requires authentication and writes nothing to disk', async () => {
    const res = await api.post('/api/uploads/images').attach('image', PNG, 'photo.png');
    assert.equal(res.status, 401);
    assert.equal(filesIn('design-images').length, 0);
  });

  test('uploads an image, records it in MongoDB and serves it', async () => {
    const { auth, user } = await registerUser(api);
    const res = await api.post('/api/uploads/images').set('Authorization', auth).attach('image', PNG, 'my photo.png');

    assert.equal(res.status, 201);
    const upload = res.body.data;
    assert.equal(upload.kind, 'design-image');
    assert.equal(upload.mimetype, 'image/png');
    assert.equal(upload.originalName, 'my photo.png');
    assert.equal(upload.size, PNG.length);
    assert.match(upload.filename, /^\d+-[a-f0-9]{16}\.png$/, 'random file name, not the user one');
    assert.match(upload.url, /^http:\/\/127\.0\.0\.1:\d+\/uploads\/design-images\//);

    const doc = await models.Upload.findById(upload.id);
    assert.equal(doc.owner.toString(), user.id);
    assert.deepEqual(filesIn('design-images'), [upload.filename]);

    const served = await api.get(upload.path);
    assert.equal(served.status, 200);
    assert.equal(served.headers['content-type'], 'image/png');
    assert.equal(served.headers['cross-origin-resource-policy'], 'cross-origin');
    assert.ok(Buffer.from(served.body).equals(PNG));

    const list = await api.get('/api/uploads?kind=design-image').set('Authorization', auth);
    assert.equal(list.body.meta.total, 1);
  });

  test('rejects non-image types and files disguised as images', async () => {
    const { auth } = await registerUser(api);
    const before = filesIn('design-images').length;

    const text = await api
      .post('/api/uploads/images')
      .set('Authorization', auth)
      .attach('image', Buffer.from('hello'), { filename: 'notes.txt', contentType: 'text/plain' });
    assert.equal(text.status, 415);
    assert.equal(text.body.error.code, 'UNSUPPORTED_FILE_TYPE');

    const svg = await api
      .post('/api/uploads/images')
      .set('Authorization', auth)
      .attach('image', Buffer.from('<svg onload="alert(1)"/>'), { filename: 'x.svg', contentType: 'image/svg+xml' });
    assert.equal(svg.status, 415);

    // HTML renamed to .png with an image MIME type: caught by the signature check and deleted
    const fake = await api
      .post('/api/uploads/images')
      .set('Authorization', auth)
      .attach('image', Buffer.from('<html><script>alert(1)</script></html>'), {
        filename: 'evil.png',
        contentType: 'image/png'
      });
    assert.equal(fake.status, 415);
    assert.equal(fake.body.error.code, 'INVALID_IMAGE');
    assert.equal(filesIn('design-images').length, before, 'rejected file was removed from disk');
  });

  test('enforces the size limit and the field name', async () => {
    const { auth } = await registerUser(api);
    const big = Buffer.concat([PNG, Buffer.alloc(1.2 * 1024 * 1024)]);
    const tooBig = await api.post('/api/uploads/images').set('Authorization', auth).attach('image', big, 'big.png');
    assert.equal(tooBig.status, 413);
    assert.equal(tooBig.body.error.code, 'LIMIT_FILE_SIZE');

    const wrongField = await api.post('/api/uploads/images').set('Authorization', auth).attach('photo', PNG, 'a.png');
    assert.equal(wrongField.status, 400);
    assert.equal(wrongField.body.error.code, 'LIMIT_UNEXPECTED_FILE');

    const noFile = await api.post('/api/uploads/images').set('Authorization', auth).field('title', 'x');
    assert.equal(noFile.status, 400);
    assert.equal(noFile.body.error.code, 'FILE_REQUIRED');
  });

  test('users can only see and delete their own uploads; delete removes the file', async () => {
    const alice = await registerUser(api);
    const bob = await registerUser(api);
    const { body } = await api.post('/api/uploads/images').set('Authorization', alice.auth).attach('image', JPEG, 'a.jpg');
    const upload = body.data;
    assert.equal(upload.mimetype, 'image/jpeg');

    assert.equal((await api.get(`/api/uploads/${upload.id}`).set('Authorization', bob.auth)).status, 404);
    assert.equal((await api.delete(`/api/uploads/${upload.id}`).set('Authorization', bob.auth)).status, 404);

    assert.ok(filesIn('design-images').includes(upload.filename));
    assert.equal((await api.delete(`/api/uploads/${upload.id}`).set('Authorization', alice.auth)).status, 200);
    assert.ok(!filesIn('design-images').includes(upload.filename));
    assert.equal((await api.get(upload.path)).status, 404);
  });

  test('avatar upload replaces the previous one', async () => {
    const { auth } = await registerUser(api);
    const first = await api.put('/api/auth/me/avatar').set('Authorization', auth).attach('image', PNG, 'me.png');
    assert.equal(first.status, 200);
    assert.match(first.body.data.avatarUrl, /\/uploads\/avatars\//);
    const firstFile = path.basename(first.body.data.avatarUrl);

    const second = await api.put('/api/auth/me/avatar').set('Authorization', auth).attach('image', JPEG, 'me2.jpg');
    assert.notEqual(second.body.data.avatarUrl, first.body.data.avatarUrl);
    assert.ok(!filesIn('avatars').includes(firstFile), 'old avatar file deleted');

    const removed = await api.delete('/api/auth/me/avatar').set('Authorization', auth);
    assert.equal(removed.body.data.avatarUrl, undefined);
    assert.equal(await models.Upload.countDocuments({ kind: 'avatar', owner: removed.body.data.id }), 0);
  });

  test('design thumbnails: owner only, cleaned up with the design', async () => {
    const owner = await registerUser(api);
    const other = await registerUser(api);
    const design = (
      await api.post('/api/designs').set('Authorization', owner.auth).send({ templateId: 'birthday-zoe-13' })
    ).body.data;

    const denied = await api
      .put(`/api/designs/${design.id}/thumbnail`)
      .set('Authorization', other.auth)
      .attach('image', PNG, 't.png');
    assert.equal(denied.status, 404);
    assert.equal(filesIn('design-thumbnails').length, 0, 'file from a rejected request is deleted');

    const ok = await api.put(`/api/designs/${design.id}/thumbnail`).set('Authorization', owner.auth).attach('image', PNG, 't.png');
    assert.equal(ok.status, 200);
    assert.match(ok.body.data.thumbnail, /\/uploads\/design-thumbnails\//);

    const copy = await api.post(`/api/designs/${design.id}/duplicate`).set('Authorization', owner.auth);
    assert.equal(copy.body.data.thumbnail, undefined, 'copies do not share the uploaded file');

    await api.delete(`/api/designs/${design.id}`).set('Authorization', owner.auth);
    assert.equal(filesIn('design-thumbnails').length, 0);
    assert.equal(await models.Upload.countDocuments({ design: design.id }), 0);
  });

  test('template thumbnails are admin only', async () => {
    const user = await registerUser(api);
    const forbidden = await api
      .put('/api/templates/birthday-zoe-13/thumbnail')
      .set('Authorization', user.auth)
      .attach('image', PNG, 'cover.png');
    assert.equal(forbidden.status, 403);

    await models.User.updateOne({ _id: user.user.id }, { role: 'admin' });
    const ok = await api.put('/api/templates/birthday-zoe-13/thumbnail').set('Authorization', user.auth).attach('image', PNG, 'cover.png');
    assert.equal(ok.status, 200);
    assert.match(ok.body.data.thumbnailUrl, /\/uploads\/template-thumbnails\//);
  });
});

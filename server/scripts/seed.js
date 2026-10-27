/**
 * Seeds MongoDB with the template catalogue and (optionally) an admin account.
 *   npm run seed
 * Uses MONGODB_URI from server/.env. Safe to run repeatedly (upserts by slug / email).
 */
import { env } from '../src/config/env.js';
import { connectDB, disconnectDB } from '../src/config/db.js';
import { seedTemplates } from '../src/services/template.service.js';
import { seedDemoUsers, DEMO_PASSWORD } from '../src/services/demo.service.js';
import { User, Template, Design, Favorite, Payment, Upload } from '../src/models/index.js';

async function seedAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } = env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log('[seed] ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin account');
    return;
  }

  const email = ADMIN_EMAIL.toLowerCase();
  let admin = await User.findOne({ email });
  if (admin) {
    admin.role = 'admin';
    await admin.save();
    console.log(`[seed] Promoted existing user ${email} to admin`);
  } else {
    admin = await User.create({ name: ADMIN_NAME || 'PetalWish Admin', email, password: ADMIN_PASSWORD, role: 'admin' });
    console.log(`[seed] Created admin account ${email}`);
  }
}

try {
  await connectDB(env.MONGODB_URI);
  // Build indexes up front so unique constraints exist before the app takes traffic
  await Promise.all([User, Template, Design, Favorite, Payment, Upload].map((m) => m.syncIndexes()));
  const result = await seedTemplates();
  console.log(`[seed] Templates: ${result.total} in seed file, ${result.upserted} inserted, ${result.modified} updated`);
  await seedAdmin();
  if (env.SEED_DEMO_USERS) {
    const created = await seedDemoUsers();
    console.log(`[seed] Demo accounts: ${created} created (password: ${DEMO_PASSWORD})`);
  }
} catch (err) {
  console.error('[seed] Failed:', err.message);
  process.exitCode = 1;
} finally {
  await disconnectDB();
}

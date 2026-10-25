import { pathToFileURL } from 'node:url';
import { env } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';
import { createApp } from './app.js';
import { seedTemplatesIfEmpty } from './services/template.service.js';
import { seedDemoUsers, DEMO_PASSWORD } from './services/demo.service.js';

export async function start({ mongoUri = env.MONGODB_URI } = {}) {
  await connectDB(mongoUri);

  if (env.AUTO_SEED_TEMPLATES) {
    const seeded = await seedTemplatesIfEmpty();
    if (seeded) console.log(`[seed] Template catalogue was empty — inserted ${seeded.upserted} templates`);
  }
  if (env.SEED_DEMO_USERS) {
    const created = await seedDemoUsers();
    if (created) console.log(`[seed] Created ${created} demo account(s) (password: ${DEMO_PASSWORD})`);
  }

  const app = createApp();
  const server = app.listen(env.PORT, () => {
    console.log(`[server] PetalWish API running at http://localhost:${env.PORT}/api`);
    if (env.SERVE_FRONTEND) console.log(`[server] Frontend available at http://localhost:${env.PORT}`);
  });

  const shutdown = (signal) => {
    console.log(`[server] ${signal} received, shutting down…`);
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 10_000).unref();
  };
  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));

  return server;
}

process.on('unhandledRejection', (reason) => {
  console.error('[server] Unhandled promise rejection:', reason);
});

// Run directly: `node src/server.js`
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  start().catch((err) => {
    console.error('[server] Failed to start:', err.message);
    process.exit(1);
  });
}

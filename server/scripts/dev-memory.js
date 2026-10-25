/**
 * Runs the API against a throw-away in-memory MongoDB (a single-node replica set, so
 * transactions work just like on Atlas). Handy before the Atlas cluster exists.
 *   npm run dev:memory
 * All data is lost when the process stops. The first run downloads a MongoDB binary.
 */
import { MongoMemoryReplSet } from 'mongodb-memory-server';

const replSet = await MongoMemoryReplSet.create({ replSet: { count: 1, storageEngine: 'wiredTiger' } });
const uri = replSet.getUri('petalwish');
console.log('[dev:memory] In-memory MongoDB started (data is NOT persisted)');

const { start } = await import('../src/server.js');
await start({ mongoUri: uri });

const stop = async () => {
  await replSet.stop();
};
process.once('exit', () => {
  stop().catch(() => {});
});

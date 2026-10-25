import mongoose from 'mongoose';

// Query operator injection ({ "$gt": "" } in place of a string) is prevented by the Zod
// validators: every value that reaches a query has been checked to be a plain string/number.
mongoose.set('strictQuery', true);

export async function connectDB(uri) {
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not set. Add your MongoDB Atlas connection string to server/.env, ' +
        'or run `npm run dev:memory` to use a temporary in-memory database.'
    );
  }

  mongoose.connection.on('disconnected', () => console.warn('[db] MongoDB disconnected'));
  mongoose.connection.on('reconnected', () => console.log('[db] MongoDB reconnected'));
  mongoose.connection.on('error', (err) => console.error('[db] MongoDB error:', err.message));

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log(`[db] Connected to MongoDB (${mongoose.connection.name})`);
  return mongoose.connection;
}

export async function disconnectDB() {
  await mongoose.disconnect();
}

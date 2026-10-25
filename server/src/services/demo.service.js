import { User } from '../models/index.js';

/**
 * Accounts behind the "Continue as demo user" buttons in the login modal.
 * Created only when SEED_DEMO_USERS is on (default: everywhere except production).
 */
export const DEMO_PASSWORD = 'petalwish2026';

export const DEMO_USERS = [
  { name: 'Elena Rostova', email: 'elena@example.com' },
  { name: 'Julian & Maya', email: 'julian@example.com' },
  { name: 'Sarah Sterling', email: 'sarah@example.com' }
];

/** Creates any missing demo accounts; existing accounts are left untouched. */
export async function seedDemoUsers() {
  let created = 0;
  for (const demo of DEMO_USERS) {
    if (await User.exists({ email: demo.email })) continue;
    await User.create({ ...demo, password: DEMO_PASSWORD });
    created += 1;
  }
  return created;
}

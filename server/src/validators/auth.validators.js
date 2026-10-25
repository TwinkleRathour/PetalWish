import { z } from 'zod';

const email = z.string().trim().toLowerCase().max(254).pipe(z.email('Please enter a valid email address'));

const password = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters')
  .regex(/[A-Za-z]/, 'Password must contain at least one letter')
  .regex(/\d/, 'Password must contain at least one number');

const name = z.string().trim().min(2, 'Name must be at least 2 characters').max(60);

export const registerSchema = z.object({ name, email, password }).strict();

export const loginSchema = z
  .object({
    email,
    // No strength rules on login: just make sure something was sent
    password: z.string().min(1, 'Password is required').max(128)
  })
  .strict();

export const updateProfileSchema = z
  .object({
    name: name.optional(),
    avatarUrl: z.url().max(2048).or(z.literal('')).optional()
  })
  .strict()
  .refine((v) => Object.keys(v).length > 0, 'Provide at least one field to update');

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required').max(128),
    newPassword: password
  })
  .strict()
  .refine((v) => v.currentPassword !== v.newPassword, {
    message: 'New password must be different from the current password',
    path: ['newPassword']
  });

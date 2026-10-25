import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address']
    },
    // Never returned by queries unless explicitly requested with .select('+password')
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatarUrl: { type: String, trim: true, maxlength: 2048 },
    plan: { type: String, enum: ['free', 'premium'], default: 'free' },
    // Premium templates this user has paid for (filled in by the payment module)
    purchasedTemplates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Template' }],
    // Incremented to invalidate every JWT issued before (password change, "log out everywhere")
    tokenVersion: { type: Number, default: 0, select: false },
    lastLoginAt: Date
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, env.BCRYPT_SALT_ROUNDS);
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.set('toJSON', {
  versionKey: false,
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.password;
    delete ret.tokenVersion;
    return ret;
  }
});

export const User = mongoose.model('User', userSchema);

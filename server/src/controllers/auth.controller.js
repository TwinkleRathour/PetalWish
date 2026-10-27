import { User } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { sendSuccess } from '../utils/response.js';
import { buildAuthPayload } from '../services/token.service.js';
import { recordUpload, uploadUrl, deleteUploadsWhere } from '../services/upload.service.js';

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (await User.exists({ email })) {
    throw ApiError.conflict('An account with this email already exists', { code: 'EMAIL_TAKEN' });
  }

  const user = await User.create({ name, email, password, lastLoginAt: new Date() });
  sendSuccess(res, buildAuthPayload(user), { status: 201 });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password +tokenVersion');

  // Same message for unknown email and wrong password, so accounts cannot be enumerated
  if (!user || !(await user.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid email or password', { code: 'INVALID_CREDENTIALS' });
  }

  user.lastLoginAt = new Date();
  await user.save();
  sendSuccess(res, buildAuthPayload(user));
}

export async function me(req, res) {
  sendSuccess(res, req.user);
}

export async function updateProfile(req, res) {
  const { name, avatarUrl } = req.body;
  if (name !== undefined) req.user.name = name;
  if (avatarUrl !== undefined) req.user.avatarUrl = avatarUrl || undefined;
  await req.user.save();
  sendSuccess(res, req.user);
}

export async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select('+password +tokenVersion');

  if (!(await user.comparePassword(currentPassword))) {
    throw ApiError.badRequest('Current password is incorrect', {
      code: 'INVALID_PASSWORD',
      details: [{ location: 'body', field: 'currentPassword', message: 'Current password is incorrect' }]
    });
  }

  user.password = newPassword;
  user.tokenVersion += 1; // signs out every other session
  await user.save();
  sendSuccess(res, buildAuthPayload(user));
}

/** PUT /api/auth/me/avatar — profile picture uploaded with multer (field "image"). */
export async function uploadAvatar(req, res) {
  const upload = await recordUpload(req);
  // Only one avatar per user: remove the previous file(s)
  await deleteUploadsWhere({ owner: req.user._id, kind: 'avatar', _id: { $ne: upload._id } });
  req.user.avatarUrl = uploadUrl(req, upload);
  await req.user.save();
  sendSuccess(res, req.user);
}

export async function removeAvatar(req, res) {
  await deleteUploadsWhere({ owner: req.user._id, kind: 'avatar' });
  req.user.avatarUrl = undefined;
  await req.user.save();
  sendSuccess(res, req.user);
}

/** Revokes every token issued to this user (all devices). */
export async function logoutAll(req, res) {
  await User.updateOne({ _id: req.user._id }, { $inc: { tokenVersion: 1 } });
  sendSuccess(res, { message: 'Logged out from all devices' });
}

import mongoose from 'mongoose';

export const UPLOAD_KIND_VALUES = ['design-image', 'avatar', 'design-thumbnail', 'template-thumbnail'];

/**
 * One document per file uploaded through multer. The file itself lives on disk
 * (UPLOAD_DIR/<folder>/<filename>); this record tracks who owns it and what it is for.
 */
const uploadSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    kind: { type: String, enum: UPLOAD_KIND_VALUES, required: true },
    filename: { type: String, required: true, unique: true }, // random name on disk
    originalName: { type: String, trim: true, maxlength: 255 }, // name on the user's computer
    mimetype: { type: String, required: true },
    size: { type: Number, required: true, min: 0 }, // bytes
    path: { type: String, required: true }, // public path, e.g. /uploads/avatars/<filename>
    // What the file is attached to, if anything
    design: { type: mongoose.Schema.Types.ObjectId, ref: 'Design' },
    template: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

uploadSchema.index({ owner: 1, createdAt: -1 });

uploadSchema.set('toJSON', {
  versionKey: false,
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  }
});

export const Upload = mongoose.model('Upload', uploadSchema);

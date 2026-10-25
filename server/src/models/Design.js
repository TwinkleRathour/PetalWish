import mongoose from 'mongoose';

export const SURFACE_KEYS = ['front', 'insideLeft', 'insideRight', 'back'];

const designSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 120, default: 'My Custom Design' },
    // Template the design was started from (null for blank designs)
    template: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', default: null },
    templateSlug: { type: String, trim: true },
    category: { type: String, trim: true, maxlength: 60, default: 'Saved Design' },

    // Same shapes the editor already uses in script.js
    bg: { type: mongoose.Schema.Types.Mixed, required: true },
    elements: { type: [mongoose.Schema.Types.Mixed], default: [] },
    // { front: { bg, elements }, insideLeft: {...}, insideRight: {...}, back: {...} }
    surfaces: { type: mongoose.Schema.Types.Mixed, default: undefined },

    // Optional PNG/JPEG preview (data URL or hosted URL)
    thumbnail: { type: String, maxlength: 2_000_000 },
    status: { type: String, enum: ['draft', 'final'], default: 'draft' }
  },
  { timestamps: true, minimize: false }
);

designSchema.index({ owner: 1, updatedAt: -1 });

designSchema.set('toJSON', {
  versionKey: false,
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  }
});

export const Design = mongoose.model('Design', designSchema);

import mongoose from 'mongoose';

export const TEMPLATE_CATEGORIES = ['Wedding', 'Birthday', 'Baby & Kids', 'Party'];
export const TEMPLATE_ORIENTATIONS = ['Portrait', 'Landscape', 'Square'];

const backgroundSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['solid', 'gradient', 'image'], required: true },
    value: String, // solid colour or image URL
    color1: String, // gradient start
    color2: String, // gradient end
    angle: Number
  },
  { _id: false, strict: false }
);

const templateSchema = new mongoose.Schema(
  {
    // Human-readable id used by the existing frontend, e.g. "birthday-zoe-13"
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug may only contain lowercase letters, numbers and dashes']
    },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 1000 },
    category: { type: String, required: true, enum: TEMPLATE_CATEGORIES },
    style: { type: String, trim: true, maxlength: 40 },
    color: { type: String, trim: true, maxlength: 40 },
    orientation: { type: String, enum: TEMPLATE_ORIENTATIONS, default: 'Portrait' },
    tags: [{ type: String, lowercase: true, trim: true, maxlength: 40 }],
    bg: { type: backgroundSchema, required: true },
    // Canvas elements (text, shapes, images…) — free-form so the editor can evolve
    elements: { type: [mongoose.Schema.Types.Mixed], default: [] },
    thumbnailUrl: { type: String, trim: true, maxlength: 2048 },

    // Pricing (amount in the smallest currency unit, i.e. paise for INR)
    isPremium: { type: Boolean, default: false },
    price: { type: Number, default: 0, min: 0 },
    currency: { type: String, default: 'INR', uppercase: true },

    isPublished: { type: Boolean, default: true },
    isTrending: { type: Boolean, default: false },
    // Display order in the gallery (lower first) — keeps the curated order of the original site
    sortOrder: { type: Number, default: 1000 },
    // Denormalised counters for sorting by popularity
    favoritesCount: { type: Number, default: 0, min: 0 },
    usageCount: { type: Number, default: 0, min: 0 },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

templateSchema.index({ category: 1, style: 1, color: 1, orientation: 1 });
templateSchema.index({ title: 'text', tags: 'text', description: 'text' });

templateSchema.set('toJSON', {
  versionKey: false,
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  }
});

export const Template = mongoose.model('Template', templateSchema);

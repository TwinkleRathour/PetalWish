import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    template: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// A user can favourite a template only once
favoriteSchema.index({ user: 1, template: 1 }, { unique: true });
favoriteSchema.index({ user: 1, createdAt: -1 });

favoriteSchema.set('toJSON', {
  versionKey: false,
  transform(_doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  }
});

export const Favorite = mongoose.model('Favorite', favoriteSchema);

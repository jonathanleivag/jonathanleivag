import { Schema, model, models } from 'mongoose'

const assetSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    type: {
      type: String,
      enum: ['logo', 'favicon', 'cv', 'project-image', 'og-image', 'other'],
      required: true,
    },
    url: { type: String, required: true },
    publicId: String,
    format: String,
    bytes: Number,
    originalFilename: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Asset = models.Asset || model('Asset', assetSchema)

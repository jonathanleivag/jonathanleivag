import { Schema, model, models } from 'mongoose'
import { localizedStringSchema } from './shared'

const experienceSchema = new Schema(
  {
    company: { type: String, required: true },
    role: { type: localizedStringSchema, required: true },
    location: String,
    period: String,
    isCurrent: { type: Boolean, default: false },
    highlights: [localizedStringSchema],
    stack: [{ type: String }],
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Experience = models.Experience || model('Experience', experienceSchema)

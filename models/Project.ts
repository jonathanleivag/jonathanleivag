import { Schema, model, models } from 'mongoose'
import { localizedStringSchema } from './shared'

const imageSchema = new Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, default: '' },
    width: { type: Number, default: 1200 },
    height: { type: Number, default: 800 },
    publicId: String,
  },
  { _id: false }
)

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: localizedStringSchema, required: true },
    type: { type: String, enum: ['professional', 'personal', 'freelance'], required: true },
    domain: String,
    url: String,
    repositoryUrl: String,
    category: String,
    summary: { type: localizedStringSchema, required: true },
    objective: localizedStringSchema,
    stack: [{ type: String }],
    features: [localizedStringSchema],
    technicalHighlights: [localizedStringSchema],
    learning: localizedStringSchema,
    value: localizedStringSchema,
    image: imageSchema,
    status: { type: String, enum: ['live', 'in-progress', 'archived'], default: 'live' },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

projectSchema.index({ isPublished: 1, isFeatured: 1, order: 1 })
projectSchema.index({ type: 1, isPublished: 1 })

export const Project = models.Project || model('Project', projectSchema)

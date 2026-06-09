import { Schema, model, models } from 'mongoose'
import { localizedStringSchema } from './shared'

const skillCategorySchema = new Schema(
  {
    title: { type: localizedStringSchema, required: true },
    description: localizedStringSchema,
    skills: [{ type: String }],
    skillUrls: { type: Map, of: String, default: {} },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
)

skillCategorySchema.index({ isPublished: 1, order: 1 })

export const SkillCategory = models.SkillCategory || model('SkillCategory', skillCategorySchema)

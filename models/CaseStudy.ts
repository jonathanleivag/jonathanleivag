import { Schema, model, models } from 'mongoose'
import { localizedStringSchema } from './shared'

const caseStudySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: localizedStringSchema, required: true },
    intro: localizedStringSchema,
    context: localizedStringSchema,
    role: localizedStringSchema,
    challenge: localizedStringSchema,
    approach: [localizedStringSchema],
    technicalDecisions: [localizedStringSchema],
    result: localizedStringSchema,
    stack: [{ type: String }],
    source: String,
    relatedProjectSlug: String,
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

caseStudySchema.index({ isPublished: 1, order: 1 })

export const CaseStudy = models.CaseStudy || model('CaseStudy', caseStudySchema)

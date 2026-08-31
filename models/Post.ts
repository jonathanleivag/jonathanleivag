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

const postSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: localizedStringSchema, required: true },
    excerpt: { type: localizedStringSchema, required: true },
    content: { type: localizedStringSchema, required: true },
    category: { type: String, enum: ['articulo', 'til', 'tutorial', 'snippet', 'caso'], required: true },
    image: imageSchema,
    tags: [{ type: String }],
    readingMinutes: { type: Number, default: 5 },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

postSchema.index({ isPublished: 1, order: 1 })

export const Post = models.Post || model('Post', postSchema)

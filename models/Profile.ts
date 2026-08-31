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

const profileSchema = new Schema(
  {
    name: { type: String, required: true },
    handle: { type: String },
    email: { type: String, required: true },
    location: { type: String },
    role: { type: localizedStringSchema, required: true },
    headline: { type: localizedStringSchema, required: true },
    summary: { type: localizedStringSchema, required: true },
    availability: { type: localizedStringSchema },
    portrait: imageSchema,
    about: {
      body: [localizedStringSchema],
      highlights: [
        {
          _id: false,
          title: localizedStringSchema,
          description: localizedStringSchema,
        },
      ],
    },
    social: {
      github: String,
      linkedin: String,
      email: String,
      cv: String,
    },
  },
  { timestamps: true }
)

export const Profile = models.Profile || model('Profile', profileSchema)

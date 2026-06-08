import { Schema, model, models } from 'mongoose'
import { localizedStringSchema } from './shared'

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

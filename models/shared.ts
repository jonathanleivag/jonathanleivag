import { Schema } from 'mongoose'

export const localizedStringSchema = new Schema(
  { es: { type: String, required: true }, en: { type: String, required: true } },
  { _id: false }
)

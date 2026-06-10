import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined')
}

type CachedConnection = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

const globalForMongoose = globalThis as unknown as { mongoose?: CachedConnection }

const cached: CachedConnection = globalForMongoose.mongoose ?? { conn: null, promise: null }

export async function connectToDatabase() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!)
  }
  cached.conn = await cached.promise
  globalForMongoose.mongoose = cached
  return cached.conn
}

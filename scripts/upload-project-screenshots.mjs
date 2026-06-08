import { v2 as cloudinary } from 'cloudinary'
import { readFileSync } from 'fs'

// Read .env.local manually
const envFile = readFileSync('.env.local', 'utf-8')
const env = Object.fromEntries(
  envFile.split('\n')
    .filter(l => l.includes('='))
    .map(l => l.split('=').map(s => s.replace(/^"|"$/g, '').trim()))
)

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
})

const screenshots = [
  { file: '/Users/jonathanleivag/nintendo.jpg',    publicId: 'jonathanleivag/projects/nintendo' },
  { file: '/Users/jonathanleivag/teslo-shop.jpg',  publicId: 'jonathanleivag/projects/teslo-shop' },
  { file: '/Users/jonathanleivag/clima-go.jpg',    publicId: 'jonathanleivag/projects/clima-go' },
  { file: '/Users/jonathanleivag/website.jpg',     publicId: 'jonathanleivag/projects/website' },
]

for (const { file, publicId } of screenshots) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
    })
    console.log(`✓ ${publicId} → ${result.secure_url}`)
  } catch (err) {
    console.error(`✗ ${publicId}:`, err.message)
  }
}

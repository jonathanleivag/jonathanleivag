import mongoose from 'mongoose'
import { profile } from '../content/profile'
import { projects } from '../content/projects'
import { personalProjects } from '../content/personal-projects'
import { skills } from '../content/skills'

// Inline models to avoid Next.js module resolution issues in scripts
const localizedString = { es: { type: String, required: true }, en: { type: String, required: true } }

const ProfileModel = mongoose.models.Profile || mongoose.model('Profile', new mongoose.Schema({
  name: String, handle: String, email: String, location: String,
  role: localizedString, headline: localizedString, summary: localizedString,
  availability: localizedString,
  about: {
    body: [localizedString],
    highlights: [{ _id: false, title: localizedString, description: localizedString }],
  },
  social: { github: String, linkedin: String, email: String, cv: String },
}, { timestamps: true }))

const ProjectModel = mongoose.models.Project || mongoose.model('Project', new mongoose.Schema({
  slug: { type: String, unique: true, index: true },
  title: localizedString, type: String, domain: String, url: String,
  category: String, summary: localizedString, objective: localizedString,
  stack: [String], features: [localizedString], technicalHighlights: [localizedString],
  learning: localizedString, value: localizedString,
  image: { url: String, alt: String, width: Number, height: Number, publicId: String },
  status: String, isFeatured: Boolean, isPublished: Boolean, order: Number,
}, { timestamps: true }))

const SkillModel = mongoose.models.SkillCategory || mongoose.model('SkillCategory', new mongoose.Schema({
  title: localizedString, description: localizedString,
  skills: [String], order: Number, isPublished: Boolean,
}, { timestamps: true }))

async function seed() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI not set')

  await mongoose.connect(uri)
  console.log('Connected to MongoDB')

  // Profile
  await ProfileModel.findOneAndUpdate(
    {},
    {
      name: profile.name,
      handle: profile.handle,
      email: profile.social.email,
      location: profile.location,
      role: { es: profile.role, en: 'Senior Full Stack Developer' },
      headline: { es: profile.hero.headline, en: 'I build web products focused on scalability, performance, and maintainability.' },
      summary: { es: profile.about.summary, en: profile.about.summary },
      availability: { es: profile.availability, en: 'Available for new projects' },
      about: {
        body: profile.about.body.map((b: string) => ({ es: b, en: b })),
        highlights: profile.about.highlights.map((h: { title: string; description: string }) => ({
          title: { es: h.title, en: h.title },
          description: { es: h.description, en: h.description },
        })),
      },
      social: profile.social,
    },
    { upsert: true, new: true }
  )
  console.log('✓ Profile seeded')

  // Professional projects
  for (const [i, p] of projects.entries()) {
    await ProjectModel.findOneAndUpdate(
      { slug: p.slug },
      {
        slug: p.slug,
        title: { es: p.title, en: p.title },
        type: 'professional',
        category: p.category,
        summary: { es: p.summary, en: p.summary },
        objective: { es: p.context, en: p.context },
        stack: p.stack,
        features: p.highlights.map((f: string) => ({ es: f, en: f })),
        technicalHighlights: p.highlights.map((h: string) => ({ es: h, en: h })),
        value: { es: p.value, en: p.value },
        status: 'live',
        isFeatured: true,
        isPublished: true,
        order: i,
      },
      { upsert: true, new: true }
    )
  }
  console.log(`✓ ${projects.length} professional projects seeded`)

  // Personal projects
  for (const [i, p] of personalProjects.entries()) {
    await ProjectModel.findOneAndUpdate(
      { slug: p.slug },
      {
        slug: p.slug,
        title: { es: p.title, en: p.title },
        type: 'personal',
        domain: p.domain,
        url: p.url,
        summary: { es: p.summary, en: p.summary },
        objective: { es: p.objective, en: p.objective },
        stack: p.stack,
        features: p.features.map((f: string) => ({ es: f, en: f })),
        technicalHighlights: p.technicalHighlights.map((h: string) => ({ es: h, en: h })),
        learning: { es: p.learning, en: p.learning },
        value: { es: '', en: '' },
        image: { url: p.image.src, alt: p.image.alt, width: p.image.width, height: p.image.height },
        status: p.status,
        isFeatured: false,
        isPublished: true,
        order: i,
      },
      { upsert: true, new: true }
    )
  }
  console.log(`✓ ${personalProjects.length} personal projects seeded`)

  // Skills
  for (const [i, cat] of skills.entries()) {
    await SkillModel.findOneAndUpdate(
      { 'title.es': cat.title },
      {
        title: { es: cat.title, en: cat.title },
        description: { es: cat.description, en: cat.description },
        skills: cat.skills,
        order: i,
        isPublished: true,
      },
      { upsert: true, new: true }
    )
  }
  console.log(`✓ ${skills.length} skill categories seeded`)

  await mongoose.disconnect()
  console.log('\nSeed complete ✓')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})

import mongoose from 'mongoose'
import { profile } from '../content/profile'
import { projects } from '../content/projects'
import { personalProjects } from '../content/personal-projects'
import { skills } from '../content/skills'
import { caseStudies } from '../content/case-studies'

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

  // Case studies
  const CaseStudyModel = mongoose.models.CaseStudy || mongoose.model('CaseStudy', new mongoose.Schema({
    slug: { type: String, unique: true, index: true },
    title: Object, intro: Object, context: Object, role: Object, challenge: Object,
    approach: [Object], technicalDecisions: [Object], result: Object,
    stack: [String], source: String, relatedProjectSlug: String,
    isFeatured: Boolean, isPublished: Boolean, order: Number,
  }, { timestamps: true }))

  for (const [i, cs] of caseStudies.entries()) {
    await CaseStudyModel.findOneAndUpdate(
      { slug: cs.slug },
      {
        slug: cs.slug,
        title: { es: cs.title, en: cs.title },
        intro: { es: cs.intro, en: cs.intro },
        context: { es: cs.context, en: cs.context },
        role: { es: cs.role, en: cs.role },
        challenge: { es: cs.challenge, en: cs.challenge },
        approach: cs.approach.map((a: string) => ({ es: a, en: a })),
        technicalDecisions: cs.technicalDecisions.map((d: string) => ({ es: d, en: d })),
        result: { es: cs.result, en: cs.result },
        stack: cs.stack,
        source: cs.source ?? '',
        isPublished: true,
        isFeatured: false,
        order: i,
      },
      { upsert: true, new: true }
    )
  }
  console.log(`✓ ${caseStudies.length} case studies seeded`)

  // Experiences
  const ExperienceModel = mongoose.models.Experience || mongoose.model('Experience', new mongoose.Schema({
    company: String,
    role: Object,
    location: String,
    period: String,
    isCurrent: Boolean,
    highlights: [Object],
    stack: [String],
    order: Number,
    isPublished: Boolean,
  }, { timestamps: true }))

  const experiences = [
    {
      company: 'MOVATEC SPA',
      role: { es: 'Desarrollador Full Stack Senior', en: 'Senior Full Stack Developer' },
      period: 'julio de 2025 - Presente',
      location: 'Paine, Región Metropolitana de Santiago, Chile',
      isCurrent: true,
      highlights: [
        { es: 'Desarrollo frontend con Vue.js 2 y Vuetify.', en: 'Frontend development with Vue.js 2 and Vuetify.' },
        { es: 'Liderazgo en migraciones desde Vue 2 hacia Vue 3.', en: 'Led migrations from Vue 2 to Vue 3.' },
        { es: 'Incorporación de TypeScript para mejorar escalabilidad y tipado del código.', en: 'Introduced TypeScript to improve scalability and type safety.' },
        { es: 'Uso de CSS modular para optimizar diseño y mantenibilidad.', en: 'Used modular CSS to optimize design and maintainability.' },
        { es: 'Implementación de componentes reutilizables y buenas prácticas de arquitectura frontend.', en: 'Implemented reusable components and frontend architecture best practices.' },
      ],
      stack: ['Vue.js 2', 'Vue.js 3', 'Vuetify', 'TypeScript', 'JavaScript', 'CSS modular'],
      order: 0,
      isPublished: true,
    },
    {
      company: 'ValpoSystems',
      role: { es: 'Analista de programación', en: 'Programming Analyst' },
      period: 'junio de 2024 - marzo de 2025',
      location: 'Gran Santiago, Región Metropolitana de Santiago, Chile',
      isCurrent: false,
      highlights: [
        { es: 'Participación en análisis y desarrollo de soluciones de programación.', en: 'Participated in analysis and development of programming solutions.' },
        { es: 'Trabajo en contexto profesional de desarrollo de software.', en: 'Worked in a professional software development context.' },
      ],
      stack: ['JavaScript', 'Software Development'],
      order: 1,
      isPublished: true,
    },
    {
      company: 'Gatblac',
      role: { es: 'Software Developer', en: 'Software Developer' },
      period: 'mayo de 2022 - junio de 2024',
      location: 'Santa Beatriz 111, Of. 1002, Providencia',
      isCurrent: false,
      highlights: [
        { es: 'Desarrollo de software en entorno profesional.', en: 'Software development in a professional environment.' },
        { es: 'Aplicación de conocimientos full stack con tecnologías JavaScript.', en: 'Applied full stack knowledge with JavaScript technologies.' },
      ],
      stack: ['JavaScript', 'Full Stack Development'],
      order: 2,
      isPublished: true,
    },
    {
      company: 'Profesional independiente',
      role: { es: 'Full stack developer JavaScript Freelance', en: 'JavaScript Full Stack Freelance Developer' },
      period: 'octubre de 2020 - mayo de 2022',
      location: '',
      isCurrent: false,
      highlights: [
        { es: 'Desarrollo full stack JavaScript para proyectos freelance.', en: 'Full stack JavaScript development for freelance projects.' },
        { es: 'Creación de sitios web y soluciones digitales para distintos requerimientos.', en: 'Built websites and digital solutions for diverse requirements.' },
      ],
      stack: ['JavaScript', 'Vue.js', 'React.js', 'React Native', 'Express.js', 'GraphQL', 'Apollo'],
      order: 3,
      isPublished: true,
    },
  ]

  for (const exp of experiences) {
    await ExperienceModel.findOneAndUpdate(
      { company: exp.company },
      exp,
      { upsert: true, new: true }
    )
  }
  console.log(`✓ ${experiences.length} experiences seeded`)

  await mongoose.disconnect()
  console.log('\nSeed complete ✓')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})

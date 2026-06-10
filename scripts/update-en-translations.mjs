import mongoose from 'mongoose'
import { readFileSync } from 'fs'

const envFile = readFileSync('.env.local', 'utf-8')
const env = Object.fromEntries(
  envFile.split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => {
      const idx = l.indexOf('=')
      const key = l.slice(0, idx).trim()
      const val = l.slice(idx + 1).trim().replace(/^"|"$/g, '')
      return [key, val]
    })
)

await mongoose.connect(env.MONGODB_URI)
console.log('Connected')

const Profile = mongoose.models.Profile || mongoose.model('Profile', new mongoose.Schema({}, { strict: false }))
const Experience = mongoose.models.Experience || mongoose.model('Experience', new mongoose.Schema({}, { strict: false }))
const Project = mongoose.models.Project || mongoose.model('Project', new mongoose.Schema({}, { strict: false }))
const SkillCategory = mongoose.models.SkillCategory || mongoose.model('SkillCategory', new mongoose.Schema({}, { strict: false }))
const CaseStudy = mongoose.models.CaseStudy || mongoose.model('CaseStudy', new mongoose.Schema({}, { strict: false }))

// ─── Profile EN ─────────────────────────────────────────────────────
await Profile.findOneAndUpdate({}, {
  'role.en': 'Senior Full Stack Developer',
  'headline.en': 'I build web products focused on scalability, performance, and maintainability.',
  'summary.en': 'I am a Senior Full Stack Developer with experience building digital solutions, responsive interfaces, and web applications with JavaScript technologies. My work combines modern frontend, backend with Express.js, GraphQL/Apollo, and a practical approach to solving technical challenges with a focus on results.',
  'availability.en': 'Available for new projects',
  'about.highlights.0.title.en': 'Modern Frontend',
  'about.highlights.0.description.en': 'Vue.js, React, TypeScript and framework migrations focused on scalability.',
  'about.highlights.1.title.en': 'Full Stack JavaScript',
  'about.highlights.1.description.en': 'Frontend, backend with Express.js, GraphQL/Apollo and mobile with React Native.',
  'about.highlights.2.title.en': 'Component Architecture',
  'about.highlights.2.description.en': 'Reusable components, modular CSS, and best practices for maintainable codebases.',
})
console.log('✓ Profile EN updated')

// ─── Experience EN ──────────────────────────────────────────────────
const expTranslations = {
  'MOVATEC SPA': {
    role: 'Senior Full Stack Developer',
    highlights: [
      'Frontend development with Vue.js 2 and Vuetify.',
      'Technical leadership in migrations from Vue 2 to Vue 3.',
      'Adoption of TypeScript to improve scalability and code typing.',
      'Use of modular CSS to optimize design and maintainability.',
      'Implementation of reusable components and frontend architecture best practices.',
    ]
  },
  'ValpoSystems': {
    role: 'Programming Analyst',
    highlights: [
      'Participation in analysis and development of programming solutions.',
      'Work in a professional software development context.',
    ]
  },
  'Gatblac': {
    role: 'Software Developer',
    highlights: [
      'Software development in a professional environment.',
      'Application of full stack knowledge with JavaScript technologies.',
    ]
  },
  'Profesional independiente': {
    role: 'JavaScript Full Stack Freelance Developer',
    highlights: [
      'Full stack JavaScript development for freelance projects.',
      'Creation of websites and digital solutions for various requirements.',
    ]
  },
}

for (const [company, data] of Object.entries(expTranslations)) {
  const exp = await Experience.findOne({ company })
  if (!exp) { console.log(`  ⚠ Not found: ${company}`); continue }
  await Experience.findByIdAndUpdate(exp._id, {
    'role.en': data.role,
    highlights: exp.highlights.map((h, i) => ({
      es: h.es || h,
      en: data.highlights[i] || h.es || h,
    }))
  })
  console.log(`✓ Experience EN: ${company}`)
}

// ─── Skill categories EN ────────────────────────────────────────────
const skillTranslations = {
  'Frontend': {
    en: 'Frontend',
    desc: 'Building modern, responsive and reusable interfaces focused on maintainability, performance and frontend architecture.'
  },
  'Mobile': {
    en: 'Mobile',
    desc: 'Experience in mobile development with JavaScript technologies to build cross-platform solutions.'
  },
  'Backend': {
    en: 'Backend',
    desc: 'Building services and backend logic with the JavaScript ecosystem, focused on full stack solutions.'
  },
  'GraphQL & APIs': {
    en: 'GraphQL & APIs',
    desc: 'Using GraphQL and Apollo to connect client and server with structured queries and efficient data communication.'
  },
  'Arquitectura frontend': {
    en: 'Frontend Architecture',
    desc: 'Best practices to scale frontend projects: framework migrations, typing, reusable components and performance optimization.'
  },
  'Producto y forma de trabajo': {
    en: 'Product & Work Approach',
    desc: 'Proactive approach to solve technical challenges, find digital solutions and work results-oriented.'
  },
  'Formación': {
    en: 'Education',
    desc: 'Academic background in computer science, informatics and computational programming.'
  },
}

for (const [titleEs, data] of Object.entries(skillTranslations)) {
  await SkillCategory.findOneAndUpdate({ 'title.es': titleEs }, {
    'title.en': data.en,
    'description.en': data.desc,
  })
  console.log(`✓ Skill EN: ${titleEs} → ${data.en}`)
}

// ─── Projects EN ────────────────────────────────────────────────────
const projectTranslations = {
  'vue-framework-migration': {
    title: 'Frontend migration from Vue 2 to Vue 3',
    summary: 'Progressive migration of Vue 2 projects to Vue 3, incorporating TypeScript, modular CSS and best practices to improve scalability and maintainability.',
    value: 'A more scalable frontend base with strict typing, better maintainability, reusable components and a more modern and responsive experience.',
  },
  'responsive-vue-interfaces': {
    title: 'Modern and responsive interfaces with Vue.js and Vuetify',
    summary: 'Development of modern, responsive and maintainable interfaces using Vue.js, Vuetify and a component structure oriented to reuse.',
    value: 'Clearer, more reusable interfaces that are easier to evolve, with better responsive behavior and a more organized technical base.',
  },
  'full-stack-javascript-solutions': {
    title: 'Full stack JavaScript solutions',
    summary: 'Development of websites and digital solutions with JavaScript technologies, combining frontend, backend and API integration.',
    value: 'Ability to take requirements to digital products, integrating frontend, backend and data services communication.',
  },
  'saas-operational-dashboard': {
    title: 'Operational management dashboard',
    summary: 'Web platform to centralize indicators, internal operations and critical business flows in a fast, clear and maintainable interface.',
    value: 'Improved operational traceability, reduced manual tasks and enabled better decisions with more reliable and accessible information.',
  },
  'api-integration-platform': {
    title: 'Integration and APIs platform',
    summary: 'Backend system to connect external services, normalize data and expose reliable endpoints for internal and external applications.',
    value: 'Increased stability of critical flows, simplified maintenance and reduced time to detect and resolve incidents.',
  },
  'customer-facing-web-app': {
    title: 'Customer-facing web application',
    summary: 'Responsive web experience for end users, focused on clarity, performance, conversion and visual consistency.',
    value: 'The experience became simpler to navigate, faster on mobile devices and easier to extend with new features.',
  },
}

for (const [slug, data] of Object.entries(projectTranslations)) {
  const result = await Project.findOneAndUpdate({ slug }, {
    'title.en': data.title,
    'summary.en': data.summary,
    'value.en': data.value,
  })
  if (result) console.log(`✓ Project EN: ${slug}`)
  else console.log(`  ⚠ Not found project: ${slug}`)
}

// ─── Case Studies EN ────────────────────────────────────────────────
const caseStudyTranslations = {
  'vue-framework-migration': {
    title: 'Case study: frontend modernization from Vue 2 to Vue 3',
    intro: 'A frontend migration focused on modernizing the technology stack without losing maintainability, visual consistency or product evolution capability.',
    context: 'At MOVATEC SPA, Jonathan works with Vue.js 2 and Vuetify on modern responsive interfaces, leading the migration of projects from Vue 2 to Vue 3.',
    role: 'Senior Full Stack Developer focused on frontend, framework migration, TypeScript adoption, modular CSS and component architecture.',
    challenge: 'Updating existing projects to Vue 3 requires balancing product continuity, component compatibility, technical order and progressive code improvement without introducing unnecessary complexity.',
    result: 'The work strengthens the product frontend base, improves maintainability, enables safer evolution to Vue 3 and reduces friction for future development.',
  },
  'responsive-vue-interfaces': {
    title: 'Case study: responsive interfaces and reusable components',
    intro: 'A frontend development approach focused on creating modern, responsive interfaces prepared to grow with the product.',
    context: "Jonathan's recent experience highlights creating interfaces with Vue.js and Vuetify, performance optimization and adoption of frontend architecture best practices.",
    role: 'Responsible for implementing interfaces, reusable components and technical improvements in frontend within a professional software development context.',
    challenge: 'Building interfaces that are visually consistent, work well on different screen sizes and remain easy to maintain as the product evolves.',
    result: 'The interface gains consistency, reusability and a stronger base to keep building new features without degrading the experience.',
  },
  'full-stack-javascript-freelance': {
    title: 'Case study: full stack JavaScript freelance development',
    intro: 'Experience building digital solutions with JavaScript technologies, from website creation to integration between frontend, backend and data.',
    context: 'Between October 2020 and May 2022, Jonathan worked as a JavaScript Full Stack Freelance Developer, applying technologies like JavaScript, Vue.js, React.js, React Native, Express.js, GraphQL and Apollo.',
    role: 'Full stack developer responsible for transforming requirements into functional digital solutions, combining frontend, backend and API consumption.',
    challenge: 'Solving diverse needs with a flexible technical base, maintaining implementation clarity and ability to adapt to different requirements.',
    result: 'The freelance experience consolidated a practical full stack vision, oriented to building complete digital solutions and solving technical challenges autonomously.',
  },
}

for (const [slug, data] of Object.entries(caseStudyTranslations)) {
  const result = await CaseStudy.findOneAndUpdate({ slug }, {
    'title.en': data.title,
    'intro.en': data.intro,
    'context.en': data.context,
    'role.en': data.role,
    'challenge.en': data.challenge,
    'result.en': data.result,
  })
  if (result) console.log(`✓ CaseStudy EN: ${slug}`)
  else console.log(`  ⚠ Not found case study: ${slug}`)
}

await mongoose.disconnect()
console.log('\n✓ All EN translations updated')

const CLOUD = 'dq8fpb695'
const projectImage = (slug: string) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1200/jonathanleivag/projects/${slug}`

export type PersonalProject = {
  slug: string
  title: string
  domain: string
  url: string
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
  summary: string
  objective: string
  stack: string[]
  features: string[]
  technicalHighlights: string[]
  learning: string
  status: 'live' | 'in-progress' | 'archived'
}

export const personalProjects: PersonalProject[] = [
  {
    slug: 'nintendo',
    title: 'Nintendo',
    domain: 'nintendo.jonathanleivag.cl',
    url: 'https://nintendo.jonathanleivag.cl',
    image: {
      src: projectImage('nintendo'),
      alt: 'Screenshot del proyecto Nintendo',
      width: 1200,
      height: 800,
    },
    summary: 'Proyecto personal inspirado en una experiencia visual de Nintendo, enfocado en UI, responsive design y presentación atractiva de contenido.',
    objective: 'Construir una interfaz visualmente sólida, clara y adaptable a distintos dispositivos, aplicando diseño orientado a producto.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Interfaz responsive y atractiva',
      'Cards de contenido interactivas',
      'Navegación clara y fluida',
      'Diseño visual orientado a producto',
    ],
    technicalHighlights: [
      'Componentización de UI reutilizable',
      'Optimización visual para mobile-first',
      'Separación entre contenido y presentación',
    ],
    learning: 'Refuerza habilidades de UI, composición visual y diseño responsive con foco en experiencia de usuario.',
    status: 'live',
  },
  {
    slug: 'teslo-shop',
    title: 'Teslo Shop',
    domain: 'teslo-shop.jonathanleivag.cl',
    url: 'https://teslo-shop.jonathanleivag.cl',
    image: {
      src: projectImage('teslo-shop'),
      alt: 'Screenshot del proyecto Teslo Shop',
      width: 1200,
      height: 800,
    },
    summary: 'Proyecto e-commerce personal para practicar arquitectura de tienda online, catálogo de productos, detalle de producto y flujos orientados a conversión.',
    objective: 'Demostrar capacidad para construir una experiencia de compra funcional, escalable y mantenible con Next.js.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    features: [
      'Catálogo de productos con filtros',
      'Detalle de producto con galería',
      'Carrito de compras',
      'Autenticación de usuarios',
      'Panel de administración',
    ],
    technicalHighlights: [
      'Arquitectura full stack con App Router',
      'Manejo de estado del carrito',
      'Integración con base de datos relacional',
      'Rutas protegidas y autenticación',
    ],
    learning: 'Experiencia completa de e-commerce: desde modelado de datos hasta UX de compra, con foco en arquitectura escalable.',
    status: 'live',
  },
  {
    slug: 'clima-go',
    title: 'Clima Go',
    domain: 'clima-go.jonathanleivag.cl',
    url: 'https://clima-go.jonathanleivag.cl',
    image: {
      src: projectImage('clima-go'),
      alt: 'Screenshot del proyecto Clima Go',
      width: 1200,
      height: 800,
    },
    summary: 'Aplicación de clima enfocada en consumo de datos externos, visualización clara de información y experiencia rápida para consulta diaria del tiempo.',
    objective: 'Practicar integración con APIs externas, manejo de estados y presentación simple de datos útiles en tiempo real.',
    stack: ['React', 'TypeScript', 'Weather API', 'CSS Modules'],
    features: [
      'Búsqueda de ciudad en tiempo real',
      'Temperatura y condición actual',
      'Pronóstico por horas',
      'Diseño limpio y legible',
    ],
    technicalHighlights: [
      'Integración con API externa de clima',
      'Manejo de estados de carga y error',
      'Interfaz minimalista centrada en datos',
    ],
    learning: 'Consolida el flujo de consumo de APIs: fetch, manejo de respuestas, estados y visualización de datos en React.',
    status: 'live',
  },
  {
    slug: 'website',
    title: 'Website Personal',
    domain: 'website.jonathanleivag.cl',
    url: 'https://website.jonathanleivag.cl',
    image: {
      src: projectImage('website'),
      alt: 'Screenshot del sitio web personal',
      width: 1200,
      height: 800,
    },
    summary: 'Sitio web personal orientado a marca profesional, presentación de perfil y estructura visual clara con enfoque en legibilidad y performance.',
    objective: 'Construir una presencia digital limpia, rápida y fácil de navegar que comunique identidad profesional.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Presentación de perfil profesional',
      'Sección de proyectos',
      'Diseño limpio y minimalista',
      'Totalmente responsive',
    ],
    technicalHighlights: [
      'Optimización de performance con Next.js',
      'Diseño mobile-first',
      'Estructura semántica y accesible',
    ],
    learning: 'Aplicación práctica de diseño personal: identidad, jerarquía visual y comunicación clara del perfil profesional.',
    status: 'live',
  },
]

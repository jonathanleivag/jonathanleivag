export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  context: string;
  contribution: string;
  value: string;
  stack: string[];
  highlights: string[];
  source: string;
  url?: string;
  domain?: string;
  image?: { src: string; alt: string };
};

export const projects: Project[] = [
  {
    slug: 'vue-framework-migration',
    title: 'Migración frontend de Vue 2 a Vue 3',
    category: 'Frontend Architecture / Framework Migration',
    summary:
      'Migración progresiva de proyectos Vue 2 hacia Vue 3, incorporando TypeScript, CSS modular y mejores prácticas para elevar escalabilidad y mantenibilidad.',
    context:
      'En MOVATEC SPA, el foco técnico incluye modernizar proyectos frontend construidos con Vue.js 2 y Vuetify, manteniendo continuidad operativa mientras se actualiza la base tecnológica.',
    contribution:
      'Liderazgo técnico en la migración de framework, definición de criterios de componentes, adopción de TypeScript y mejoras en arquitectura frontend.',
    value:
      'Una base frontend más preparada para crecer, con tipado estricto, mejor mantenibilidad, componentes reutilizables y una experiencia más moderna y responsiva.',
    stack: ['Vue.js 2', 'Vue.js 3', 'Vuetify', 'TypeScript', 'CSS modular', 'JavaScript'],
    highlights: [
      'Migración desde Vue 2 a Vue 3.',
      'Incorporación de TypeScript para mejorar escalabilidad.',
      'Optimización de diseño y mantenibilidad con CSS modular.',
      'Implementación de componentes reutilizables.',
      'Aplicación de buenas prácticas en arquitectura frontend.',
    ],
    source: 'LinkedIn Profile PDF - MOVATEC SPA',
  },
  {
    slug: 'responsive-vue-interfaces',
    title: 'Interfaces modernas y responsivas con Vue.js y Vuetify',
    category: 'Frontend Development / UI Engineering',
    summary:
      'Desarrollo de interfaces modernas, responsivas y mantenibles utilizando Vue.js, Vuetify y una estructura de componentes orientada a reutilización.',
    context:
      'La experiencia profesional reciente destaca trabajo sólido con Vue.js 2 y Vuetify, enfocado en la creación de interfaces modernas y responsivas.',
    contribution:
      'Construcción de componentes reutilizables, mejora de rendimiento frontend y adopción de buenas prácticas para mantener una interfaz consistente y escalable.',
    value:
      'Interfaces más claras, reutilizables y fáciles de evolucionar, con mejor comportamiento responsive y una base técnica más ordenada.',
    stack: ['Vue.js', 'Vuetify', 'JavaScript', 'TypeScript', 'CSS modular'],
    highlights: [
      'Creación de interfaces modernas y responsivas.',
      'Componentización para reutilización y consistencia.',
      'Optimización de rendimiento frontend.',
      'Buenas prácticas en arquitectura de UI.',
    ],
    source: 'LinkedIn Profile PDF - MOVATEC SPA',
  },
  {
    slug: 'full-stack-javascript-solutions',
    title: 'Soluciones full stack JavaScript',
    category: 'Full Stack Development / Freelance',
    summary:
      'Desarrollo de sitios web y soluciones digitales con tecnologías JavaScript, combinando frontend, backend e integración de APIs.',
    context:
      'Como Full Stack Developer JavaScript freelance, Jonathan trabajó en la creación de sitios web y soluciones digitales para distintos requerimientos.',
    contribution:
      'Aplicación de conocimientos en JavaScript, Vue.js, React.js, React Native, Express.js, Apollo Server/Client y GraphQL para construir soluciones funcionales.',
    value:
      'Capacidad de llevar requerimientos a productos digitales, integrando frontend, backend y comunicación con servicios de datos.',
    stack: ['JavaScript', 'React.js', 'React Native', 'Vue.js', 'Express.js', 'GraphQL', 'Apollo Server', 'Apollo Client'],
    highlights: [
      'Desarrollo full stack con ecosistema JavaScript.',
      'Creación de sitios web y soluciones digitales.',
      'Uso de GraphQL y Apollo en cliente/servidor.',
      'Experiencia en frontend web y mobile con React Native.',
    ],
    source: 'LinkedIn Profile PDF - Extracto y experiencia freelance',
  },
];

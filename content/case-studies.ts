export type CaseStudy = {
  slug: string;
  title: string;
  intro: string;
  context: string;
  role: string;
  challenge: string;
  approach: string[];
  technicalDecisions: string[];
  result: string;
  stack: string[];
  source: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'vue-2-to-vue-3-migration',
    title: 'Caso de estudio: modernización frontend de Vue 2 a Vue 3',
    intro:
      'Una migración frontend enfocada en modernizar la base tecnológica sin perder mantenibilidad, consistencia visual ni capacidad de evolución del producto.',
    context:
      'En MOVATEC SPA, Jonathan trabaja con Vue.js 2 y Vuetify en interfaces modernas y responsivas, liderando la migración de proyectos desde Vue 2 hacia Vue 3.',
    role:
      'Desarrollador Full Stack Senior con foco en frontend, migración de framework, adopción de TypeScript, CSS modular y arquitectura de componentes.',
    challenge:
      'Actualizar proyectos existentes a Vue 3 requiere equilibrar continuidad del producto, compatibilidad de componentes, orden técnico y mejora progresiva del código sin introducir complejidad innecesaria.',
    approach: [
      'Revisar la base Vue 2 existente para identificar componentes, patrones y dependencias críticas.',
      'Definir una estrategia de migración progresiva hacia Vue 3.',
      'Incorporar TypeScript para mejorar tipado, legibilidad y seguridad en cambios futuros.',
      'Aplicar CSS modular para reducir acoplamiento visual y facilitar mantenimiento.',
      'Mantener foco en componentes reutilizables, rendimiento y buenas prácticas frontend.',
    ],
    technicalDecisions: [
      'Migración gradual en lugar de reescritura completa.',
      'Uso de TypeScript como base para mayor escalabilidad del código.',
      'Componentes reutilizables como unidad principal de evolución de UI.',
      'CSS modular para mejorar separación de responsabilidades visuales.',
      'Arquitectura frontend orientada a mantenibilidad y rendimiento.',
    ],
    result:
      'El trabajo fortalece la base frontend del producto, mejora la mantenibilidad, habilita una evolución más segura hacia Vue 3 y reduce fricción para futuros desarrollos.',
    stack: ['Vue.js 2', 'Vue.js 3', 'Vuetify', 'TypeScript', 'CSS modular', 'JavaScript'],
    source: 'LinkedIn Profile PDF - MOVATEC SPA',
  },
  {
    slug: 'reusable-responsive-interfaces',
    title: 'Caso de estudio: interfaces responsivas y componentes reutilizables',
    intro:
      'Un enfoque de desarrollo frontend orientado a crear interfaces modernas, responsivas y preparadas para crecer con el producto.',
    context:
      'La experiencia reciente de Jonathan destaca creación de interfaces con Vue.js y Vuetify, optimización de rendimiento y adopción de buenas prácticas de arquitectura frontend.',
    role:
      'Responsable de implementar interfaces, componentes reutilizables y mejoras técnicas en frontend dentro de un contexto profesional de desarrollo de software.',
    challenge:
      'Construir interfaces que sean visualmente consistentes, funcionen bien en distintos tamaños de pantalla y sigan siendo fáciles de mantener a medida que el producto evoluciona.',
    approach: [
      'Diseñar componentes reutilizables para evitar duplicación de lógica y estilos.',
      'Priorizar responsive design en flujos y pantallas principales.',
      'Optimizar rendimiento percibido mediante estructuras de UI más claras.',
      'Aplicar patrones consistentes para estados, layout y componentes compartidos.',
    ],
    technicalDecisions: [
      'Uso de Vuetify para acelerar consistencia visual y estructura UI.',
      'Separación entre componentes de presentación y lógica cuando aplica.',
      'CSS modular para mejorar mantenibilidad del diseño.',
      'Buenas prácticas frontend para facilitar lectura y evolución del código.',
    ],
    result:
      'La interfaz gana consistencia, reutilización y una base más sólida para seguir construyendo nuevas funcionalidades sin degradar la experiencia.',
    stack: ['Vue.js', 'Vuetify', 'JavaScript', 'TypeScript', 'CSS modular'],
    source: 'LinkedIn Profile PDF - MOVATEC SPA',
  },
  {
    slug: 'full-stack-javascript-freelance',
    title: 'Caso de estudio: desarrollo full stack JavaScript freelance',
    intro:
      'Experiencia construyendo soluciones digitales con tecnologías JavaScript, desde creación de sitios web hasta integración entre frontend, backend y datos.',
    context:
      'Entre octubre de 2020 y mayo de 2022, Jonathan trabajó como Full Stack Developer JavaScript freelance, aplicando tecnologías como JavaScript, Vue.js, React.js, React Native, Express.js, GraphQL y Apollo.',
    role:
      'Desarrollador full stack responsable de transformar requerimientos en soluciones digitales funcionales, combinando frontend, backend y consumo de APIs.',
    challenge:
      'Resolver necesidades variadas con una base técnica flexible, manteniendo claridad en la implementación y capacidad de adaptación a distintos requerimientos.',
    approach: [
      'Entender el requerimiento y traducirlo en una solución web funcional.',
      'Seleccionar tecnologías JavaScript adecuadas según el tipo de producto.',
      'Construir frontend con Vue.js, React.js o React Native según el caso.',
      'Implementar backend con Express.js y APIs cuando el proyecto lo requiere.',
      'Usar GraphQL y Apollo para comunicación eficiente entre cliente y servidor.',
    ],
    technicalDecisions: [
      'Ecosistema JavaScript como base común para frontend y backend.',
      'GraphQL/Apollo para estructurar consultas y comunicación de datos.',
      'React Native para escenarios mobile.',
      'Express.js para servicios backend ligeros y flexibles.',
    ],
    result:
      'La experiencia freelance consolidó una visión full stack práctica, orientada a construir soluciones digitales completas y resolver desafíos técnicos con autonomía.',
    stack: ['JavaScript', 'Vue.js', 'React.js', 'React Native', 'Express.js', 'GraphQL', 'Apollo Server', 'Apollo Client'],
    source: 'LinkedIn Profile PDF - Extracto y experiencia freelance',
  },
];

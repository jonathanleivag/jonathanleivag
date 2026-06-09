export type SkillCategory = {
  title: string;
  description: string;
  skills: string[];
};

export const skills: SkillCategory[] = [
  {
    title: 'Frontend',
    description:
      'Desarrollo de interfaces modernas, responsivas y reutilizables con foco en mantenibilidad, rendimiento y arquitectura frontend.',
    skills: ['Vue.js 2', 'Vue.js 3', 'Vuetify', 'React.js', 'TypeScript', 'JavaScript', 'CSS modular', 'Responsive Design', 'Component Architecture'],
  },
  {
    title: 'Mobile',
    description:
      'Experiencia en desarrollo mobile con tecnologías JavaScript para construir soluciones multiplataforma.',
    skills: ['React Native', 'JavaScript', 'UI Components', 'Mobile Interfaces'],
  },
  {
    title: 'Backend',
    description:
      'Construcción de servicios y lógica backend con el ecosistema JavaScript, orientado a soluciones full stack.',
    skills: ['Express.js', 'Node.js', 'JavaScript', 'API Development', 'Backend Services'],
  },
  {
    title: 'GraphQL & APIs',
    description:
      'Uso de GraphQL y Apollo para conectar cliente y servidor con consultas estructuradas y comunicación eficiente de datos.',
    skills: ['GraphQL', 'Apollo Server', 'Apollo Client', 'API Integration', 'Client-Server Communication'],
  },
  {
    title: 'Arquitectura frontend',
    description:
      'Buenas prácticas para escalar proyectos frontend: migraciones de framework, tipado, componentes reutilizables y optimización de rendimiento.',
    skills: ['Vue 2 to Vue 3 Migration', 'TypeScript Adoption', 'Reusable Components', 'Performance Optimization', 'Frontend Best Practices', 'Maintainable UI'],
  },
  {
    title: 'Producto y forma de trabajo',
    description:
      'Enfoque proactivo para resolver desafíos técnicos, buscar soluciones digitales y trabajar orientado a resultados.',
    skills: ['Desarrollo Web', 'Creación de sitios web', 'Solución de problemas', 'Orientación a resultados', 'Proactividad', 'Scrum Foundation', 'Scrum Developer'],
  },
];

export type SkillCategory = {
  title: string;
  description: string;
  skills: string[];
};

export const skills: SkillCategory[] = [
  {
    title: 'Frontend',
    description:
      'Construcción de interfaces modernas, accesibles y mantenibles con foco en experiencia de usuario, performance y sistemas de componentes.',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS', 'Responsive Design', 'Accessibility', 'UI Architecture'],
  },
  {
    title: 'Backend',
    description:
      'Diseño de APIs, servicios y lógica de negocio con estructuras claras, manejo de errores, seguridad y capacidad de evolución.',
    skills: ['Node.js', 'REST APIs', 'GraphQL', 'Authentication', 'Authorization', 'Background Jobs', 'API Design', 'Error Handling', 'Service Architecture'],
  },
  {
    title: 'Bases de datos',
    description:
      'Modelado de datos orientado a consistencia, consultas eficientes, trazabilidad y soporte para productos que crecen.',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Relational Modeling', 'Query Optimization', 'Migrations', 'Data Integrity'],
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Despliegue, automatización y operación de aplicaciones con foco en confiabilidad, velocidad de entrega y mantenibilidad.',
    skills: ['Vercel', 'AWS', 'Docker', 'CI/CD', 'Environment Management', 'Monitoring', 'Logging', 'Deployment Strategy'],
  },
  {
    title: 'Arquitectura y calidad',
    description:
      'Decisiones técnicas que equilibran velocidad, escalabilidad, legibilidad, testing, documentación y costo de mantenimiento.',
    skills: ['System Design', 'Clean Architecture', 'Testing Strategy', 'Code Review', 'Technical Documentation', 'Performance', 'Security Basics', 'Scalability'],
  },
  {
    title: 'Producto y colaboración',
    description:
      'Trabajo cercano con producto, diseño y stakeholders para traducir problemas de negocio en soluciones técnicas claras y accionables.',
    skills: ['Product Thinking', 'Technical Discovery', 'Trade-off Analysis', 'Agile Delivery', 'Stakeholder Communication', 'Mentoring', 'Ownership'],
  },
];

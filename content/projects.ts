export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  highlights: string[];
  links?: {
    demo?: string;
    repository?: string;
    caseStudy?: string;
  };
};

export const projects: Project[] = [
  {
    slug: 'saas-operational-dashboard',
    title: 'Dashboard operativo para gestión de negocio',
    category: 'SaaS / Business Operations',
    summary:
      'Plataforma web para centralizar indicadores, operaciones internas y flujos críticos de negocio en una interfaz rápida, clara y mantenible.',
    problem:
      'El equipo necesitaba visibilidad operativa sin depender de hojas de cálculo, reportes manuales o información distribuida en múltiples herramientas.',
    solution:
      'Diseñé una arquitectura full stack con módulos reutilizables, API estructurada, vistas orientadas a decisiones y una base preparada para crecer sin reescribir funcionalidades clave.',
    impact:
      'Mejoró la trazabilidad de la operación, redujo tareas manuales y permitió tomar decisiones con información más confiable y accesible.',
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    highlights: [
      'Arquitectura modular orientada a evolución del producto.',
      'Componentes reutilizables para visualización de datos.',
      'Modelo de datos preparado para reportes y auditoría.',
      'Experiencia responsive para uso operativo diario.',
    ],
    links: {
      caseStudy: '#caso-dashboard-operativo',
    },
  },
  {
    slug: 'api-integration-platform',
    title: 'Plataforma de integraciones y APIs',
    category: 'Backend / Integrations',
    summary:
      'Sistema backend para conectar servicios externos, normalizar datos y exponer endpoints confiables para aplicaciones internas y externas.',
    problem:
      'Los procesos dependían de integraciones frágiles, lógica duplicada y flujos difíciles de monitorear cuando un proveedor externo fallaba.',
    solution:
      'Construí una capa de integración con separación de responsabilidades, manejo consistente de errores, contratos claros y logs útiles para diagnóstico.',
    impact:
      'Aumentó la estabilidad de los flujos críticos, simplificó el mantenimiento y redujo el tiempo necesario para detectar y resolver incidentes.',
    stack: ['Node.js', 'TypeScript', 'REST APIs', 'PostgreSQL', 'Redis', 'Docker'],
    highlights: [
      'Diseño de contratos de API claros y versionables.',
      'Manejo de errores y reintentos para servicios externos.',
      'Normalización de datos entre sistemas heterogéneos.',
      'Base preparada para observabilidad y monitoreo.',
    ],
    links: {
      caseStudy: '#caso-plataforma-integraciones',
    },
  },
  {
    slug: 'customer-facing-web-app',
    title: 'Aplicación web orientada a clientes',
    category: 'Product Engineering / Frontend',
    summary:
      'Experiencia web responsive para usuarios finales, enfocada en claridad, performance, conversión y consistencia visual.',
    problem:
      'El producto necesitaba una interfaz más rápida, clara y fácil de usar para reducir fricción en flujos clave y mejorar percepción de calidad.',
    solution:
      'Implementé una interfaz basada en componentes, optimicé flujos principales y cuidé performance, accesibilidad y consistencia responsive.',
    impact:
      'La experiencia resultó más simple de navegar, más rápida en dispositivos móviles y más fácil de extender con nuevas funcionalidades.',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Design Systems', 'Vercel'],
    highlights: [
      'Diseño mobile-first con componentes consistentes.',
      'Optimización de performance percibida y carga inicial.',
      'Mejoras de accesibilidad en navegación y estados de UI.',
      'Estructura escalable para nuevas secciones del producto.',
    ],
    links: {
      caseStudy: '#caso-web-clientes',
    },
  },
];

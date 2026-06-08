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
  learnings: string[];
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'caso-dashboard-operativo',
    title: 'Caso de estudio: dashboard operativo para gestión de negocio',
    intro:
      'Un producto interno diseñado para convertir información dispersa en una experiencia operativa centralizada, clara y accionable.',
    context:
      'El equipo trabajaba con información distribuida entre planillas, herramientas externas y reportes manuales. Esto hacía difícil tener una visión confiable del estado del negocio y aumentaba el costo operativo de tareas recurrentes.',
    role:
      'Participé como Full Stack Senior, cubriendo definición técnica, arquitectura, modelado de datos, implementación frontend/backend y criterios de escalabilidad del producto.',
    challenge:
      'El principal desafío fue diseñar una solución suficientemente simple para entregar valor rápido, pero con una base técnica sólida para incorporar nuevos módulos, roles y reportes sin generar deuda innecesaria.',
    approach: [
      'Identifiqué los flujos operativos más críticos antes de definir pantallas o modelos de datos.',
      'Separé la lógica de negocio de la presentación para facilitar cambios futuros.',
      'Organicé la interfaz alrededor de decisiones que el usuario necesitaba tomar, no alrededor de la estructura interna de la base de datos.',
      'Priorizé componentes reutilizables para tablas, filtros, estados vacíos y visualización de indicadores.',
    ],
    technicalDecisions: [
      'Uso de TypeScript para reducir errores entre frontend y backend.',
      'Modelo relacional para mantener consistencia en entidades operativas.',
      'Componentes desacoplados para facilitar evolución visual y funcional.',
      'Estructura preparada para permisos, auditoría y crecimiento modular.',
    ],
    result:
      'La solución permitió reducir dependencia de procesos manuales, mejorar visibilidad operativa y entregar una base técnica más fácil de mantener y extender.',
    learnings: [
      'Un dashboard útil no es una acumulación de gráficos: es una herramienta para tomar mejores decisiones.',
      'La simplicidad en la interfaz requiere claridad previa en el modelo de información.',
      'Diseñar para mantenimiento desde el inicio evita reescrituras costosas cuando el producto crece.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    slug: 'caso-plataforma-integraciones',
    title: 'Caso de estudio: plataforma de integraciones y APIs',
    intro:
      'Una capa backend diseñada para conectar servicios externos con mayor estabilidad, trazabilidad y claridad técnica.',
    context:
      'La operación dependía de servicios externos con distintos formatos, reglas y comportamientos ante errores. La lógica de integración estaba distribuida, lo que dificultaba diagnosticar fallas y evolucionar flujos.',
    role:
      'Lideré el diseño e implementación backend, definiendo contratos, estructura de servicios, manejo de errores, normalización de datos y criterios de mantenibilidad.',
    challenge:
      'El reto fue absorber la complejidad de proveedores externos sin trasladarla al resto del sistema, manteniendo una API interna clara y confiable.',
    approach: [
      'Mapeé los puntos de integración y sus modos de falla más frecuentes.',
      'Definí servicios por responsabilidad para evitar lógica duplicada.',
      'Normalicé respuestas externas en contratos internos consistentes.',
      'Incorporé logs y mensajes de error orientados a diagnóstico real.',
    ],
    technicalDecisions: [
      'Separación entre capa de proveedor, capa de dominio y capa de API.',
      'Contratos internos estables para proteger al frontend de cambios externos.',
      'Manejo explícito de timeouts, errores recuperables y errores definitivos.',
      'Estructura preparada para colas, reintentos y observabilidad.',
    ],
    result:
      'La plataforma redujo fragilidad operativa, simplificó mantenimiento y permitió evolucionar integraciones sin afectar directamente la experiencia de usuario.',
    learnings: [
      'Una buena integración debe diseñarse asumiendo que los servicios externos fallarán.',
      'Los contratos internos son clave para proteger el producto de cambios de terceros.',
      'La observabilidad no es un extra: es parte del diseño de sistemas confiables.',
    ],
    stack: ['Node.js', 'TypeScript', 'REST APIs', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    slug: 'caso-web-clientes',
    title: 'Caso de estudio: aplicación web orientada a clientes',
    intro:
      'Una experiencia frontend enfocada en claridad, velocidad y facilidad de uso para usuarios finales en dispositivos móviles y desktop.',
    context:
      'El producto necesitaba mejorar la experiencia de usuario en flujos clave, especialmente en mobile, donde la fricción visual y tiempos de carga afectaban la percepción de calidad.',
    role:
      'Trabajé en arquitectura frontend, componentes reutilizables, responsive design, integración con APIs y mejoras de performance y accesibilidad.',
    challenge:
      'El desafío fue elevar la calidad de la experiencia sin sobrediseñar la solución ni introducir complejidad innecesaria en el sistema de componentes.',
    approach: [
      'Reorganicé la interfaz priorizando las acciones principales del usuario.',
      'Definí componentes reutilizables con variantes claras y estados consistentes.',
      'Apliqué diseño mobile-first para evitar adaptar tardíamente la experiencia.',
      'Optimicé carga inicial, jerarquía visual y feedback en interacciones clave.',
    ],
    technicalDecisions: [
      'Uso de componentes tipados para mejorar mantenibilidad.',
      'Separación entre componentes de layout, UI y lógica de datos.',
      'Estados visuales explícitos para loading, empty, error y success.',
      'Criterios de accesibilidad integrados en navegación y componentes interactivos.',
    ],
    result:
      'La aplicación ganó claridad, mejor comportamiento responsive y una base visual más consistente para seguir incorporando funcionalidades.',
    learnings: [
      'La calidad percibida depende tanto de performance como de claridad visual.',
      'Mobile-first obliga a priorizar lo esencial desde el inicio.',
      'Los estados de interfaz bien diseñados reducen incertidumbre y soporte innecesario.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Design Systems', 'Vercel'],
  },
];

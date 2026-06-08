import type { Project, CaseStudy, SkillCategory } from './types'

export const projects: Project[] = [
  {
    id: '1',
    title: 'Plataforma de Gestión Comercial',
    category: 'Enterprise SaaS',
    problem: 'Digitalizar procesos manuales de ventas y seguimiento de clientes.',
    stack: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript'],
    impact: 'Reducción del 60% en tiempo de gestión operativa',
    slug: 'gestion-comercial',
    links: {},
  },
  {
    id: '2',
    title: 'Sistema de Notificaciones Multicanal',
    category: 'Microservicio',
    problem: 'Centralizar envíos de email, SMS y push desde múltiples productos.',
    stack: ['Node.js', 'Redis', 'RabbitMQ', 'TypeScript'],
    impact: 'Procesamiento de 50k eventos/día con latencia < 200ms',
    slug: 'notificaciones-multicanal',
    links: {},
  },
  {
    id: '3',
    title: 'Dashboard de Analytics en Tiempo Real',
    category: 'Internal Tool',
    problem: 'Visualizar métricas de negocio con actualización en tiempo real.',
    stack: ['React', 'WebSocket', 'ClickHouse', 'TypeScript'],
    impact: 'Eliminó 3 reportes manuales semanales para el equipo de producto',
    slug: 'dashboard-analytics',
    links: {},
  },
]

export const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Migración de Monolito a Microservicios',
    category: 'Arquitectura',
    context:
      'Sistema legacy de 5 años con acoplamiento alto, deploys costosos y tiempos de respuesta degradados bajo carga.',
    decisions: [
      'Strangler pattern para migración gradual sin downtime',
      'API Gateway centralizado para routing y autenticación',
      'Event-driven communication con RabbitMQ para servicios asíncronos',
    ],
    result: 'Deploy time de 45min → 8min. Incidentes de producción reducidos un 70%.',
    slug: 'migracion-microservicios',
    stack: ['NestJS', 'RabbitMQ', 'Docker', 'PostgreSQL', 'Redis'],
    links: {},
  },
  {
    id: '2',
    title: 'Optimización de Performance: de 8s a 1.2s',
    category: 'Performance',
    context:
      'Dashboard con queries N+1 no detectadas, sin caché y bundle de frontend sin optimizar causaban carga lenta crítica.',
    decisions: [
      'Auditoría con Query Explain en PostgreSQL para detectar N+1',
      'Redis para cache de queries frecuentes con TTL por entidad',
      'Code splitting y lazy loading en React por ruta',
    ],
    result: 'LCP de 8.2s a 1.2s. Tasa de rebote reducida un 40%.',
    slug: 'optimizacion-performance',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'TypeScript'],
    links: {},
  },
]

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand', 'React Query'],
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'NestJS', 'GraphQL', 'REST APIs', 'WebSockets', 'Jest'],
  },
  {
    name: 'Bases de datos',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Prisma', 'Mikro-ORM'],
  },
  {
    name: 'Cloud & DevOps',
    skills: ['Docker', 'AWS', 'Vercel', 'CI/CD', 'GitHub Actions', 'Nginx'],
  },
  {
    name: 'Tools',
    skills: ['Git', 'Figma', 'Postman', 'RabbitMQ', 'Turborepo', 'ESLint'],
  },
]

import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Ingresa tu nombre'),
  email: z.string().trim().email('Ingresa un email válido'),
  subject: z.string().trim().min(3, 'Ingresa un asunto'),
  message: z.string().trim().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  company: z.string().optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

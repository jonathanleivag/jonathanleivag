'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { connectToDatabase } from '@/lib/mongodb'
import { Project } from '@/models/Project'
import { z } from 'zod'
import { auth } from '@/auth'

const projectSchema = z.object({
  slug: z.string().min(1),
  titleEs: z.string().min(1),
  titleEn: z.string().min(1),
  type: z.enum(['professional', 'personal', 'freelance']),
  category: z.string().optional(),
  domain: z.string().optional(),
  url: z.string().optional(),
  summaryEs: z.string().min(1),
  summaryEn: z.string().min(1),
  stack: z.string().optional(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  order: z.coerce.number().optional(),
})

export async function createProject(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  const raw = {
    slug: formData.get('slug'),
    titleEs: formData.get('titleEs'),
    titleEn: formData.get('titleEn'),
    type: formData.get('type'),
    category: formData.get('category') || undefined,
    domain: formData.get('domain') || undefined,
    url: formData.get('url') || undefined,
    summaryEs: formData.get('summaryEs'),
    summaryEn: formData.get('summaryEn'),
    stack: formData.get('stack') || undefined,
    isFeatured: formData.get('isFeatured') === 'on',
    isPublished: formData.get('isPublished') === 'on',
    order: formData.get('order') || 0,
  }

  const parsed = projectSchema.parse(raw)
  await connectToDatabase()

  await Project.create({
    slug: parsed.slug,
    title: { es: parsed.titleEs, en: parsed.titleEn },
    type: parsed.type,
    category: parsed.category,
    domain: parsed.domain,
    url: parsed.url,
    summary: { es: parsed.summaryEs, en: parsed.summaryEn },
    stack: parsed.stack ? parsed.stack.split(',').map((s) => s.trim()).filter(Boolean) : [],
    isFeatured: parsed.isFeatured ?? false,
    isPublished: parsed.isPublished ?? true,
    order: parsed.order ?? 0,
  })

  revalidatePath('/admin/projects')
  revalidatePath('/')
  await triggerRevalidation([parsed.slug])
  redirect('/admin/projects')
}

export async function updateProject(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  await connectToDatabase()

  await Project.findByIdAndUpdate(id, {
    title: { es: formData.get('titleEs'), en: formData.get('titleEn') },
    type: formData.get('type'),
    category: formData.get('category') || undefined,
    domain: formData.get('domain') || undefined,
    url: formData.get('url') || undefined,
    summary: { es: formData.get('summaryEs'), en: formData.get('summaryEn') },
    stack: String(formData.get('stack') || '').split(',').map((s) => s.trim()).filter(Boolean),
    isFeatured: formData.get('isFeatured') === 'on',
    isPublished: formData.get('isPublished') === 'on',
    order: Number(formData.get('order') || 0),
  })

  revalidatePath('/admin/projects')
  revalidatePath('/')
  await triggerRevalidation()
  redirect('/admin/projects')
}

export async function deleteProject(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  await connectToDatabase()
  await Project.findByIdAndDelete(id)

  revalidatePath('/admin/projects')
  revalidatePath('/')
  redirect('/admin/projects')
}

async function triggerRevalidation(slugs?: string[]) {
  try {
    const secret = process.env.REVALIDATE_SECRET
    if (!secret) return

    const paths = [
      '/',
      '/es',
      '/en',
      ...(slugs ? slugs.flatMap((s) => [`/es/projects/${s}`, `/en/projects/${s}`]) : []),
    ]

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': secret,
      },
      body: JSON.stringify({ paths }),
    })
  } catch {
    // Non-critical: revalidation will happen automatically on next ISR cycle
  }
}

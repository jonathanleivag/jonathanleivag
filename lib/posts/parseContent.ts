export interface PostBlock {
  type: 'heading' | 'paragraph'
  text: string
  id?: string
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function parsePostContent(raw: string): PostBlock[] {
  return raw
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      if (chunk.startsWith('## ')) {
        const text = chunk.slice(3).trim()
        return { type: 'heading' as const, text, id: slugifyHeading(text) }
      }
      return { type: 'paragraph' as const, text: chunk.replace(/\n/g, ' ') }
    })
}

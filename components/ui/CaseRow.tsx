import { Link } from '@/i18n/navigation'

interface Props {
  index: number
  title: string
  category: string
  intro: string
  href: string
}

export function CaseRow({ index, title, category, intro, href }: Props) {
  return (
    <Link
      href={href}
      className="grid grid-cols-[40px_1fr_28px] sm:grid-cols-[60px_minmax(0,1fr)_320px_28px] items-start gap-6 py-6 px-2 border-t border-[var(--dc-border)] cursor-pointer hover:bg-[var(--dc-surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e6dd]"
    >
      <span className="font-heading text-3xl font-black leading-none text-transparent" style={{ WebkitTextStroke: '1px rgba(232,230,221,.32)' }}>
        {String(index).padStart(2, '0')}
      </span>
      <span className="flex flex-col gap-2">
        <span className="font-heading text-2xl font-black leading-tight tracking-tight text-[#e8e6dd]">{title}</span>
        <span className="text-[10px] tracking-[0.12em] uppercase text-[var(--dc-muted)]">{category}</span>
      </span>
      <span className="text-xs leading-[1.8] text-[#c9cec9] hidden sm:block">{intro}</span>
      <span className="text-right text-[var(--dc-muted)]">→</span>
    </Link>
  )
}

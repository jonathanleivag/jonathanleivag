import { Link } from '@/i18n/navigation'

interface Props {
  date: string
  category: string
  minutesLabel: string
  title: string
  href: string
}

export function PostRow({ date, category, minutesLabel, title, href }: Props) {
  return (
    <Link
      href={href}
      className="grid grid-cols-[110px_70px_1fr_28px] sm:grid-cols-[150px_90px_1fr_28px] items-center gap-5 py-[18px] px-2 border-t border-[var(--dc-border)] cursor-pointer hover:bg-[var(--dc-surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e6dd]"
    >
      <span className="text-[11px] tracking-[0.08em] text-[var(--dc-muted)]">{date} · {minutesLabel}</span>
      <span className="text-[10px] tracking-[0.12em] text-[var(--dc-muted)] uppercase hidden sm:block">{category}</span>
      <span className="font-heading text-lg font-bold tracking-tight text-[#e8e6dd]">{title}</span>
      <span className="text-right text-[var(--dc-muted)]">→</span>
    </Link>
  )
}

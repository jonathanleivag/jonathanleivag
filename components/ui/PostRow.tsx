import Image from 'next/image'
import { Link } from '@/i18n/navigation'

interface Props {
  date: string
  category: string
  minutesLabel: string
  title: string
  href: string
  image?: { src: string; alt: string }
}

export function PostRow({ date, category, minutesLabel, title, href, image }: Props) {
  return (
    <Link
      href={href}
      className="grid grid-cols-[40px_90px_minmax(0,1fr)_28px] sm:grid-cols-[48px_150px_90px_minmax(0,1fr)_28px] items-center gap-5 py-[18px] px-2 border-t border-[var(--dc-border)] cursor-pointer hover:bg-[var(--dc-surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8e6dd]"
    >
      <span className="relative w-10 h-10 border border-[var(--dc-border-strong)] overflow-hidden shrink-0">
        {image && <Image src={image.src} alt={image.alt} fill sizes="40px" className="object-cover" />}
      </span>
      <span className="text-[11px] tracking-[0.08em] text-[var(--dc-muted)]">{date} · {minutesLabel}</span>
      <span className="text-[10px] tracking-[0.12em] text-[var(--dc-muted)] uppercase hidden sm:block">{category}</span>
      <span className="font-heading text-lg font-bold tracking-tight text-[#e8e6dd]">{title}</span>
      <span className="text-right text-[var(--dc-muted)]">→</span>
    </Link>
  )
}

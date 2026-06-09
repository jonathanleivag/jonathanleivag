import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ label, title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12', className)}>
      {label && (
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-emerald-400 block mb-3">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 leading-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-zinc-300 text-base sm:text-lg max-w-2xl">{subtitle}</p>
      )}
    </div>
  )
}

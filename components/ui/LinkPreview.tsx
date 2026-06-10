'use client'

import { useRef, useState } from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import Image from 'next/image'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LinkPreviewProps {
  children: React.ReactNode
  url: string
  imageSrc?: string
  imageAlt?: string
  title?: string
  description?: string
  className?: string
  openInNewTab?: boolean
  disabled?: boolean
}

export function LinkPreview({
  children,
  url,
  imageSrc,
  imageAlt,
  title,
  description,
  className,
  openInNewTab = true,
  disabled = false,
}: LinkPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const x = useMotionValue(0)
  const translateX = useSpring(x, { stiffness: 100, damping: 15 })
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const half = rect.width / 2
    x.set(e.clientX - rect.left - half)
  }

  if (disabled) {
    return (
      <a
        href={url}
        target={openInNewTab ? '_blank' : undefined}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {children}
      </a>
    )
  }

  return (
    <HoverCardPrimitive.Root openDelay={80} closeDelay={100} onOpenChange={setIsOpen}>
      <HoverCardPrimitive.Trigger asChild>
        <a
          ref={ref}
          href={url}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
          onMouseMove={handleMouseMove}
          className={cn('relative', className)}
        >
          {children}
        </a>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          side="top"
          align="center"
          sideOffset={12}
          className="z-50 pointer-events-none"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{ translateX }}
                className={cn(
                  'w-64 rounded-xl border border-white/10 bg-zinc-950 shadow-2xl ring-1 ring-emerald-500/10 overflow-hidden',
                  'motion-reduce:transition-none'
                )}
              >
                {imageSrc && (
                  <div className="relative w-full aspect-video bg-zinc-800">
                    <Image
                      src={imageSrc}
                      alt={imageAlt ?? title ?? ''}
                      fill
                      className="object-cover"
                      sizes="256px"
                      unoptimized={imageSrc.startsWith('blob:')}
                    />
                  </div>
                )}
                {(title || description) && (
                  <div className="p-3 space-y-1">
                    {title && <p className="text-xs font-semibold text-zinc-100 truncate">{title}</p>}
                    {description && <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{description}</p>}
                    <p className="text-xs text-zinc-600 truncate">{url}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  )
}

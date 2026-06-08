'use client'

import { useEffect, useRef, useState } from 'react'
import { profile } from '@/content/profile'

interface TerminalLine {
  prefix: string
  text: string
  isOutput?: boolean
}

const username = profile.social.email.split('@')[0]

const LINES: TerminalLine[] = [
  { prefix: '$', text: 'whoami' },
  { prefix: ' ', text: username, isOutput: true },
  { prefix: '$', text: 'cat role.txt' },
  { prefix: ' ', text: profile.role, isOutput: true },
  { prefix: '$', text: 'skills --list' },
  { prefix: '→', text: 'Vue.js · React · TypeScript', isOutput: true },
  { prefix: '→', text: 'Express.js · GraphQL · Apollo', isOutput: true },
  { prefix: '→', text: 'React Native · Node.js · REST', isOutput: true },
]

export function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced.current) {
      setVisibleCount(LINES.length)
      return
    }
    const interval = setInterval(() => {
      setVisibleCount((n) => {
        if (n >= LINES.length) {
          clearInterval(interval)
          return n
        }
        return n + 1
      })
    }, 220)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-xl border border-white/10 bg-black overflow-hidden font-mono text-sm">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-zinc-900/60">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-xs text-zinc-500">~/portfolio</span>
      </div>

      {/* Lines */}
      <div className="p-5 space-y-1 min-h-[220px] overflow-x-auto">
        {LINES.slice(0, visibleCount).map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className={line.isOutput ? 'text-emerald-400' : 'text-zinc-500'}>
              {line.prefix}
            </span>
            <span className={line.isOutput ? 'text-zinc-300' : 'text-zinc-100'}>
              {line.text}
            </span>
          </div>
        ))}
        <div className="flex gap-3">
          <span className="text-zinc-500">$</span>
          <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  )
}

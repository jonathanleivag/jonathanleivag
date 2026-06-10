'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TerminalLine {
  prefix: string
  text: string
  isOutput?: boolean
}

interface Props {
  username?: string
  role?: string
}

export function Terminal({ username = 'jonathan.leiva', role = 'Senior Full Stack Developer' }: Props) {
  const LINES: TerminalLine[] = [
    { prefix: '$', text: 'whoami' },
    { prefix: ' ', text: username, isOutput: true },
    { prefix: '$', text: 'cat role.txt' },
    { prefix: ' ', text: role, isOutput: true },
    { prefix: '$', text: 'skills --list' },
    { prefix: '→', text: 'Vue.js · React · TypeScript', isOutput: true },
    { prefix: '→', text: 'Express.js · GraphQL · Apollo', isOutput: true },
    { prefix: '→', text: 'React Native · Node.js · REST', isOutput: true },
  ]

  const totalLines = LINES.length
  const [visibleCount, setVisibleCount] = useState(totalLines)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced.current) return

    setVisibleCount(0)
    const interval = setInterval(() => {
      setVisibleCount((n) => {
        if (n >= totalLines) { clearInterval(interval); return n }
        return n + 1
      })
    }, 200)
    return () => clearInterval(interval)
  }, [totalLines])

  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-700/50 bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_80px_-20px_rgba(0,0,0,0.8)] font-mono text-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-auto text-xs text-zinc-500 tracking-wide">~/portfolio</span>
      </div>

      {/* Body */}
      <div className="p-5 min-h-[240px] overflow-x-auto space-y-0.5">
        <AnimatePresence>
          {LINES.slice(0, visibleCount).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="flex gap-3 leading-6"
            >
              <span className={
                line.prefix === '→'
                  ? 'text-emerald-400 shrink-0'
                  : line.prefix === '$'
                  ? 'text-zinc-500 shrink-0'
                  : 'text-zinc-500 shrink-0'
              }>
                {line.prefix}
              </span>
              <span className={
                line.isOutput
                  ? line.prefix === '→'
                    ? 'text-emerald-300'
                    : 'text-zinc-200'
                  : 'text-zinc-100'
              }>
                {line.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Cursor line */}
        <div className="flex gap-3 leading-6 mt-1">
          <span className="text-zinc-500">$</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
            className="inline-block w-[7px] h-[15px] bg-emerald-400 rounded-sm translate-y-0.5 motion-reduce:animate-none"
          />
        </div>
      </div>
    </div>
  )
}

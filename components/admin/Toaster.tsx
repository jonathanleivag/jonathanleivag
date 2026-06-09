'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { CheckCircle, XCircle, X } from 'lucide-react'

interface Toast {
  id: number
  type: 'success' | 'error'
  message: string
}

const MESSAGES: Record<string, { type: 'success' | 'error'; message: string }> = {
  saved:   { type: 'success', message: 'Guardado correctamente' },
  created: { type: 'success', message: 'Creado correctamente' },
  deleted: { type: 'success', message: 'Eliminado correctamente' },
  updated: { type: 'success', message: 'Actualizado correctamente' },
  error:   { type: 'error',   message: 'Ocurrió un error. Intenta de nuevo.' },
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const toast = searchParams.get('toast')
    if (!toast) return

    const config = MESSAGES[toast] ?? { type: 'success' as const, message: toast }
    const id = Date.now()

    setToasts((prev) => [...prev, { id, ...config }])

    // Clear the ?toast param from URL without reload
    const params = new URLSearchParams(searchParams.toString())
    params.delete('toast')
    const newUrl = params.toString() ? `${pathname}?${params}` : pathname
    router.replace(newUrl, { scroll: false })

    // Auto-dismiss after 3s
    const timer = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)

    return () => clearTimeout(timer)
  }, [searchParams, pathname, router])

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium animate-in slide-in-from-bottom-2 duration-200 ${
            toast.type === 'success'
              ? 'bg-zinc-900 border-emerald-500/30 text-zinc-100'
              : 'bg-zinc-900 border-red-500/30 text-zinc-100'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle size={16} className="text-emerald-400 shrink-0" />
          ) : (
            <XCircle size={16} className="text-red-400 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button
            onClick={() => dismiss(toast.id)}
            className="ml-2 text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label="Cerrar"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}

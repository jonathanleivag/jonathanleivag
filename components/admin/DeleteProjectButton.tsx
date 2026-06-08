'use client'

import { useTransition } from 'react'

interface Props {
  action: () => Promise<void>
}

export function DeleteProjectButton({ action }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    if (!confirm('¿Eliminar este proyecto? Esta acción no se puede deshacer.')) return
    startTransition(() => { action() })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors"
    >
      {isPending ? 'Eliminando...' : 'Eliminar proyecto'}
    </button>
  )
}

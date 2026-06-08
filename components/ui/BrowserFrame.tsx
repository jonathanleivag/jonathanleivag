interface BrowserFrameProps {
  url: string
  children: React.ReactNode
}

export function BrowserFrame({ url, children }: BrowserFrameProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* macOS browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 bg-zinc-800/90 border-b border-white/5">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        {/* URL bar */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-zinc-700/60 rounded-md px-3 py-1 text-xs text-zinc-400 max-w-xs w-full text-center truncate">
            {url}
          </div>
        </div>
        <div className="w-[54px] shrink-0" />
      </div>

      {/* Content */}
      {children}
    </div>
  )
}

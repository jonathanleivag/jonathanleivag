interface Props {
  className?: string
}

export function CodeMark({ className }: Props) {
  return (
    <svg viewBox="0 0 320 230" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="code-mark-gradient" x1="0" y1="0" x2="320" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2dd4bf" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <g stroke="url(#code-mark-gradient)" strokeWidth="22" strokeLinecap="square" strokeLinejoin="miter">
        <polyline points="95,58 15,121 95,185" />
        <line x1="120" y1="215" x2="205" y2="15" />
        <polyline points="225,58 305,121 225,185" />
      </g>
    </svg>
  )
}

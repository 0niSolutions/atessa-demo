const s = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const Icono = {
  m2: (p) => (
    <svg viewBox="0 0 24 24" width="15" height="15" {...p} {...s}>
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-5h6v5" />
    </svg>
  ),
  terreno: (p) => (
    <svg viewBox="0 0 24 24" width="15" height="15" {...p} {...s}>
      <path d="M3 7l9-4 9 4-9 4-9-4Zm0 5l9 4 9-4M3 17l9 4 9-4" />
    </svg>
  ),
  local: (p) => (
    <svg viewBox="0 0 24 24" width="15" height="15" {...p} {...s}>
      <path d="M4 9h16v11H4zM4 9l1.5-5h13L20 9M9 20v-6h6v6" />
    </svg>
  ),
  habitacion: (p) => (
    <svg viewBox="0 0 24 24" width="15" height="15" {...p} {...s}>
      <path d="M3 18v-7h13a4 4 0 0 1 4 4v3M3 11V7M3 18h18M3 15h6" />
    </svg>
  ),
  cochera: (p) => (
    <svg viewBox="0 0 24 24" width="15" height="15" {...p} {...s}>
      <path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17M3 21h18M9 21v-5h6v5" />
    </svg>
  ),
  instagram: ({ size = 22 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} {...s} stroke="#fff">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none" />
    </svg>
  ),
  flecha: (p) => (
    <svg viewBox="0 0 24 24" width="15" height="15" {...p} {...s}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  whatsapp: ({ size = 26 }) => (
    <svg viewBox="0 0 32 32" width={size} height={size}>
      <path
        fill="#fff"
        d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 2.2a10.8 10.8 0 1 1-5.7 20.1l-.4-.2-3 .8.8-2.9-.2-.4A10.8 10.8 0 0 1 16 5.2Zm-4.5 5.4c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.4 4.7 2.7 1 3.2.8 3.8.8.6 0 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5l-.9-.4-2.1-.9c-.3-.1-.5-.1-.7.1l-1 1.2c-.2.2-.4.2-.7.1a8.6 8.6 0 0 1-2.6-1.6 9.8 9.8 0 0 1-1.8-2.3c-.2-.3 0-.5.1-.6l.5-.6.3-.5v-.6l-1-2.4c-.2-.5-.5-.5-.7-.5h-.6Z"
      />
    </svg>
  ),
}

export const CDN_BASE = 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons'
export const GITHUB_RAW = 'https://raw.githubusercontent.com/homarr-labs/dashboard-icons/main'

export const FORMATS = ['svg', 'png', 'webp'] as const

// Cache ttl 1h
export const CACHE_TTL = 60 * 60 * 1000

export const PORT = parseInt(process.env.PORT ?? '3000', 10)

import { CDN_BASE, GITHUB_RAW, CACHE_TTL, FORMATS } from '../config.js'
import { Cache } from './cache.js'
import type { Format, IconMeta, IconInfo } from '../types.js'

const listCache = new Cache<string[]>()
const metaCache = new Cache<IconMeta>()

export function buildCdnUrl(name: string, format: Format): string {
  return `${CDN_BASE}/${format}/${name}.${format}`
}

/** Returns all icon names (including light/dark) from tree.json */
export async function getIconNames(): Promise<string[]> {
  const cached = listCache.get('names')
  if (cached) return cached

  const res = await fetch(`${GITHUB_RAW}/tree.json`)
  if (!res.ok) throw new Error(`Failed to fetch icon list (${res.status})`)

  const tree = (await res.json()) as Record<string, string[]>

  // Derive canonical names from the SVG list; filter out any non-.svg entries
  const names = (tree.svg ?? [])
    .filter((f) => f.endsWith('.svg'))
    .map((f) => f.slice(0, -4)) // strip ".svg"

  listCache.set('names', names, CACHE_TTL)
  return names
}

/** Fetches and caches metadata for a base icon name */
export async function getIconMeta(name: string): Promise<IconMeta | null> {
  const cached = metaCache.get(name)
  if (cached) return cached

  const res = await fetch(`${GITHUB_RAW}/meta/${name}.json`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to fetch metadata for "${name}" (${res.status})`)

  const meta = (await res.json()) as IconMeta
  metaCache.set(name, meta, CACHE_TTL)
  return meta
}

/** Builds a full IconInfo object from metadata, resolving all CDN URLs */
export async function getIconInfo(name: string): Promise<IconInfo | null> {
  const meta = await getIconMeta(name)
  if (!meta) return null

  const urls = Object.fromEntries(
    FORMATS.map((fmt) => [
      fmt,
      {
        dark: buildCdnUrl(meta.colors.dark, fmt),
        ...(meta.colors.light ? { light: buildCdnUrl(meta.colors.light, fmt) } : {}),
      },
    ])
  ) as IconInfo['urls']

  return {
    name,
    base: meta.base,
    categories: meta.categories,
    aliases: meta.aliases,
    updatedAt: meta.update.timestamp,
    urls,
  }
}

export function filterByQuery(names: string[], query: string): string[] {
  const q = query.toLowerCase()
  return names.filter((n) => n.includes(q))
}

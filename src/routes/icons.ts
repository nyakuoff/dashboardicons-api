import { Hono } from 'hono'
import { FORMATS } from '../config.js'
import {
  getIconNames,
  getIconInfo,
  buildCdnUrl,
  filterByQuery,
} from '../services/icons.js'
import type { Format } from '../types.js'

const icons = new Hono()

// GET /icons?q=query
// List all icon names; filter with ?q=
icons.get('/', async (c) => {
  const q = c.req.query('q')
  const names = await getIconNames()
  const results = q ? filterByQuery(names, q) : names
  return c.json({ count: results.length, icons: results })
})

// GET /icons/:name
// Full icon info: metadata + CDN URLs for all formats and theme variants
icons.get('/:name', async (c) => {
  const { name } = c.req.param()
  const info = await getIconInfo(name)
  if (!info) return c.json({ error: `Icon "${name}" not found` }, 404)
  return c.json(info)
})

// GET /icons/:name/:format
// Redirect to CDN for the given format (svg | png | webp)
// Use the exact icon name including any -light / -dark suffix
icons.get('/:name/:format', async (c) => {
  const { name, format } = c.req.param()

  if (!(FORMATS as readonly string[]).includes(format)) {
    return c.json({ error: `Invalid format "${format}". Valid: ${FORMATS.join(', ')}` }, 400)
  }

  return c.redirect(buildCdnUrl(name, format as Format), 302)
})

export default icons

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import icons from './routes/icons.js'

const app = new Hono()

app.use('*', cors())
app.use('*', logger())

app.onError((err, c) => {
  console.error(err)
  return c.json({ error: err.message }, 500)
})

app.get('/', (c) =>
  c.json({
    name: 'dashboardicons-api',
    version: '1.0.0',
    source: 'https://github.com/homarr-labs/dashboard-icons',
    endpoints: {
      'GET /icons': 'List all icons. Filter with ?q=<query>',
      'GET /icons/:name': 'Icon info with CDN URLs for all formats and theme variants',
      'GET /icons/:name/:format': 'Redirect to CDN asset (format: svg | png | webp)',
    },
  })
)

app.route('/icons', icons)

export default app

import { serve } from '@hono/node-server'
import app from './app.js'
import { PORT } from './config.js'

serve({ fetch: app.fetch, port: PORT }, () => {
  console.log(`dashboardicons-api running on http://localhost:${PORT}`)
})

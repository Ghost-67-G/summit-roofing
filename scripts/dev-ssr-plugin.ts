import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Plugin } from 'vite'

/**
 * Renders pages on the dev server with the same `render()` function the
 * production build uses to prerender them, so `npm run dev` shows exactly the
 * HTML that ships — islands included.
 */
export function devSsr(): Plugin {
  return {
    name: 'summit:dev-ssr',
    apply: 'serve',

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.originalUrl ?? req.url ?? '/'
        const { pathname } = new URL(url, 'http://localhost')
        const wantsHtml = req.headers.accept?.includes('text/html')

        // Let Vite handle assets, modules and anything that isn't a page view.
        if (req.method !== 'GET' || !wantsHtml || path.extname(pathname)) return next()

        try {
          const rawTemplate = await readFile(path.resolve(server.config.root, 'index.html'), 'utf8')
          const template = await server.transformIndexHtml(url, rawTemplate)
          const { render, applyTemplate } = await server.ssrLoadModule('/src/entry-server.tsx')
          const page = render(pathname)

          res.statusCode = page.status
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(applyTemplate(template, page))
        } catch (error) {
          server.ssrFixStacktrace(error as Error)
          next(error)
        }
      })
    },

    // Most components only run on the server, so React Fast Refresh can't
    // patch them in place. Reload the page instead whenever source changes.
    hotUpdate({ file }) {
      if (this.environment.name !== 'client') return
      if (!/\/src\/.*\.(tsx?|json)$/.test(file)) return
      this.environment.hot.send({ type: 'full-reload' })
      return []
    },
  }
}

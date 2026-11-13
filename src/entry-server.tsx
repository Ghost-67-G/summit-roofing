import { renderToString } from 'react-dom/server'
import { Layout } from './components/layout/Layout'
import { renderHead } from './lib/seo'
import { findRoute, notFoundRoute, routes } from './routes'

export { SITE_URL } from './config/site'
export { routes }

export interface RenderedPage {
  head: string
  body: string
  status: number
}

/** Renders one page to HTML. Used by the dev server and by scripts/prerender.js. */
export function render(pathname: string): RenderedPage {
  const route = findRoute(pathname)
  const { component: Page, meta } = route ?? notFoundRoute

  const body = renderToString(
    <Layout currentPath={meta.path}>
      <Page />
    </Layout>,
  )

  return { head: renderHead(meta), body, status: route ? 200 : 404 }
}

/** Fills the placeholders in index.html. */
export function applyTemplate(template: string, page: Pick<RenderedPage, 'head' | 'body'>, extraHead = '') {
  // Function replacers, so `$` sequences in page content (prices!) stay literal.
  return template.replace('<!--app-head-->', () => page.head + extraHead).replace('<!--app-html-->', () => page.body)
}

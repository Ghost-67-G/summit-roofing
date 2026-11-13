/**
 * Final build step. `vite build` has produced the client assets in dist/ and
 * `vite build --ssr` the server renderer in .ssr/. This renders every route to
 * static HTML, then writes sitemap.xml and robots.txt.
 */
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const ROOT = path.resolve(import.meta.dirname, '..')
const DIST = path.join(ROOT, 'dist')
const SSR_DIR = path.join(ROOT, '.ssr')

const { render, applyTemplate, routes, SITE_URL } = await import(pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href)

if (!process.env.VITE_SITE_URL) {
  console.warn(`⚠ VITE_SITE_URL is not set — canonical and Open Graph URLs will use ${SITE_URL}`)
}

const template = await readFile(path.join(DIST, 'index.html'), 'utf8')

// Preload the Latin body font so text renders in the brand font on first paint.
const assets = await readdir(path.join(DIST, 'assets'))
const font = assets.find((file) => /^archivo-latin-wght-normal-.*\.woff2$/.test(file))
const fontPreload = font ? `\n    <link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />` : ''

async function writePage(urlPath, outFile) {
  const page = render(urlPath)
  const html = applyTemplate(template, page, fontPreload)
  const target = path.join(DIST, outFile)
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, html)
  console.log(`  ${String(page.status).padEnd(4)}${urlPath.padEnd(18)}→ dist/${outFile}`)
}

console.log('Prerendering pages…')
for (const { meta } of routes) {
  await writePage(meta.path, path.join(meta.path.slice(1), 'index.html'))
}
await writePage('/404/', '404.html')

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter(({ meta }) => !meta.noindex)
  .map(({ meta }) => `  <url><loc>${SITE_URL}${meta.path}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}
</urlset>
`
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap)
await writeFile(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
console.log('  wrote sitemap.xml, robots.txt')

await rm(SSR_DIR, { recursive: true, force: true })

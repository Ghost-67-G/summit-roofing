/**
 * Turns the source photos in /images into responsive AVIF + WebP sets in
 * /public/images and writes src/data/image-manifest.json, which <Picture>
 * reads for srcset, intrinsic size and the blurred placeholder.
 *
 * Also renders the PNG icons (apple-touch-icon, schema logo) from the SVG
 * favicon. Run it after adding or replacing a photo:  npm run images
 */
import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const SOURCE_DIR = path.join(ROOT, 'images')
const OUTPUT_DIR = path.join(ROOT, 'public/images')
const PUBLIC_DIR = path.join(ROOT, 'public')
const MANIFEST_PATH = path.join(ROOT, 'src/data/image-manifest.json')

const DEFAULT_WIDTHS = [480, 768, 1024, 1440, 1920]

// Project photos are shown at card size (half a card for before/after pairs,
// up to ~820 CSS px for the featured home page tile), so they skip 1920.
const PROJECT_WIDTHS = [400, 640, 960, 1280, 1600]

function widthsFor(name) {
  return name.startsWith('project-') ? PROJECT_WIDTHS : DEFAULT_WIDTHS
}

const AVIF_OPTIONS = { quality: 50, effort: 4 }
const WEBP_OPTIONS = { quality: 72, effort: 5 }

async function optimizePhoto(file) {
  const name = path.parse(file).name
  const input = await readFile(path.join(SOURCE_DIR, file))
  const hash = createHash('sha1').update(input).digest('hex').slice(0, 8)
  const { width, height } = await sharp(input).metadata()

  const candidates = widthsFor(name)
  const widths = candidates.filter((w) => w <= width)
  if (widths.length === 0) widths.push(width)

  await Promise.all(
    widths.flatMap((w) => {
      const resized = sharp(input).resize({ width: w })
      return [
        resized
          .clone()
          .avif(AVIF_OPTIONS)
          .toFile(path.join(OUTPUT_DIR, `${name}-${w}.${hash}.avif`)),
        resized
          .clone()
          .webp(WEBP_OPTIONS)
          .toFile(path.join(OUTPUT_DIR, `${name}-${w}.${hash}.webp`)),
      ]
    }),
  )

  const placeholder = await sharp(input).resize({ width: 20 }).blur(1.2).webp({ quality: 50 }).toBuffer()

  console.log(`  ${name.padEnd(22)} ${width}×${height} → ${widths.join(', ')}`)
  return [name, { width, height, widths, hash, placeholder: `data:image/webp;base64,${placeholder.toString('base64')}` }]
}

async function renderIcons() {
  const svg = await readFile(path.join(PUBLIC_DIR, 'favicon.svg'))
  // iOS rounds the corners itself, so the touch icon is a full-bleed square.
  await sharp(svg, { density: 600 })
    .resize(180, 180)
    .flatten({ background: '#121619' })
    .png()
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'))
  await sharp(svg, { density: 900 }).resize(512, 512).png().toFile(path.join(PUBLIC_DIR, 'logo.png'))
  console.log('  icons                  apple-touch-icon.png, logo.png')
}

async function main() {
  const files = (await readdir(SOURCE_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()
  await rm(OUTPUT_DIR, { recursive: true, force: true })
  await mkdir(OUTPUT_DIR, { recursive: true })

  console.log(`Optimizing ${files.length} photos…`)
  const entries = []
  for (const file of files) entries.push(await optimizePhoto(file))
  await writeFile(MANIFEST_PATH, `${JSON.stringify(Object.fromEntries(entries), null, 2)}\n`)

  await renderIcons()
  console.log(`Wrote ${path.relative(ROOT, MANIFEST_PATH)}`)
}

await main()

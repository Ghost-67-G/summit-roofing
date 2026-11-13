/**
 * Renders scripts/og-image.html to public/og-image.jpg with headless Chrome.
 * Set CHROME_PATH if Chrome isn't on your PATH as `google-chrome`.
 */
import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const chrome = process.env.CHROME_PATH ?? 'google-chrome'
const workDir = mkdtempSync(path.join(tmpdir(), 'og-'))
const screenshot = path.join(workDir, 'og.png')

execFileSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=3000',
    `--screenshot=${screenshot}`,
    pathToFileURL(path.join(ROOT, 'scripts/og-image.html')).href,
  ],
  { stdio: 'ignore' },
)

await sharp(screenshot).jpeg({ quality: 84, mozjpeg: true }).toFile(path.join(ROOT, 'public/og-image.jpg'))
rmSync(workDir, { recursive: true, force: true })
console.log('Wrote public/og-image.jpg')

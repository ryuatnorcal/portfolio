// Scans public/img/backgrounds for images and writes a manifest the hero
// banner imports. Runs automatically before `npm run dev` and `npm run build`.
import { readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dir = join(root, 'public', 'img', 'backgrounds')
const out = join(root, 'src', 'generated', 'backgrounds.json')
const exts = /\.(jpe?g|png|webp|avif)$/i

const files = existsSync(dir)
  ? readdirSync(dir).filter((f) => exts.test(f)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  : []

mkdirSync(join(root, 'src', 'generated'), { recursive: true })
writeFileSync(out, JSON.stringify(files.map((f) => `/img/backgrounds/${encodeURIComponent(f)}`), null, 2) + '\n')
console.log(`[backgrounds] ${files.length} image(s) found in public/img/backgrounds`)

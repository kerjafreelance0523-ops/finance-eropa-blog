#!/usr/bin/env node
/**
 * Generate favicon and logo variants from public/static/images/logo.png.
 * Outputs: favicon-16x16, favicon-32x32, apple-touch-icon (180), android-chrome-96x96, mstile-150x150.
 * Optionally: twitter-card.png (1200x630) with logo on Swiss Navy background.
 */

import sharp from 'sharp'
import { mkdir, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LOGO_SRC = join(ROOT, 'public', 'static', 'images', 'logo.png')
const FAVICONS_DIR = join(ROOT, 'public', 'static', 'favicons')
const IMAGES_DIR = join(ROOT, 'public', 'static', 'images')

const SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-96x96.png', size: 96 },
  { name: 'mstile-150x150.png', size: 150 },
]

async function main() {
  await mkdir(FAVICONS_DIR, { recursive: true })

  let logo = sharp(LOGO_SRC)
  const meta = await logo.metadata()
  if (!meta.width || !meta.height) {
    throw new Error('Could not read logo dimensions')
  }

  for (const { name, size } of SIZES) {
    const outPath = join(FAVICONS_DIR, name)
    await sharp(LOGO_SRC)
      .resize(size, size)
      .png()
      .toFile(outPath)
    console.log(`Wrote ${name} (${size}x${size})`)
  }

  // Twitter / OG card: 1200x630, Swiss Navy background (#102a43), logo centered and scaled
  const CARD_WIDTH = 1200
  const CARD_HEIGHT = 630
  const BG_HEX = '#102a43'
  const logoSize = 280
  const logoBuf = await sharp(LOGO_SRC)
    .resize(logoSize, logoSize)
    .png()
    .toBuffer()

  const cardPath = join(IMAGES_DIR, 'twitter-card.png')
  await sharp({
    create: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      channels: 3,
      background: BG_HEX,
    },
  })
    .composite([
      {
        input: logoBuf,
        top: Math.round((CARD_HEIGHT - logoSize) / 2),
        left: Math.round((CARD_WIDTH - logoSize) / 2),
      },
    ])
    .png()
    .toFile(cardPath)
  console.log(`Wrote twitter-card.png (${CARD_WIDTH}x${CARD_HEIGHT})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

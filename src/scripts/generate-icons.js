const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { performance } = require('node:perf_hooks')

const { cyan, gray, green, reset } = require('../constants/system.constants')

const INPUT_SVG = path.resolve(__dirname, '../images/logo.svg')
const OUT_DIR = path.resolve(__dirname, '../images/icons')

const SIZES = [16, 32, 48, 512]

const generate = async () => {
  const start = performance.now()

  if (!fs.existsSync(INPUT_SVG)) {
    console.error(`Input SVG not found at ${INPUT_SVG}`)
    process.exit(1)
  }

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  const svgBuffer = fs.readFileSync(INPUT_SVG)

  for (const size of SIZES) {
    const pngName = `logo-${size}_x_${size}.png`
    const outPath = path.join(OUT_DIR, pngName)

    await sharp(svgBuffer).resize(size, size, { fit: 'contain' }).png().toFile(outPath)

    console.log(`${gray}src/images/icons/${cyan}${pngName}${reset}`)
  }

  const end = performance.now()
  const time = Math.round(end - start)

  console.log(`${green}✔ Icons generated in ${time}ms${reset}`)
}

generate().catch(err => {
  console.error(err)
  process.exit(1)
})

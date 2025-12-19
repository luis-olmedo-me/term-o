import fs from 'fs'
import glob from 'glob'
import { performance } from 'node:perf_hooks'
import path from 'path'

import { cyan, gray, green, reset } from '../constants/system.constants'

export function copyIcons(watch) {
  const approvalLabel = watch ? `${cyan}` : `${green}✔ `

  return {
    name: 'copy-icons',
    closeBundle() {
      const start = performance.now()
      const srcDir = path.resolve('src/images/icons')
      const outDir = path.resolve('dist/assets/icons')

      if (!fs.existsSync(srcDir)) return

      fs.mkdirSync(outDir, { recursive: true })

      const files = glob.sync('*.png', { cwd: srcDir })

      files.forEach(file => {
        const from = path.join(srcDir, file)
        const to = path.join(outDir, file)

        fs.copyFileSync(from, to)

        console.log(`${gray}dist/assets/icons/${cyan}${file}${reset}`)
      })

      const end = performance.now()
      const time = Math.round(end - start)

      console.log(`${approvalLabel}Icons copied in ${time}ms.${reset}`)
    }
  }
}

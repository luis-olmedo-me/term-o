import fs from 'fs'
import { performance } from 'node:perf_hooks'
import path from 'path'

import { cyan, gray, green, reset } from '../constants/system.constants'

export function copyManifest(watch) {
  const approvalLabel = watch ? `${cyan}` : `${green}✔ `

  return {
    name: 'copy-manifest',
    closeBundle() {
      const start = performance.now()
      const src = path.resolve('src/manifest.json')
      const dest = path.resolve('dist/manifest.json')

      if (!fs.existsSync(src)) {
        console.warn('⚠ manifest.json not found')
        return
      }

      fs.copyFileSync(src, dest)

      const end = performance.now()
      const time = Math.round(end - start)

      console.log(`${gray}dist/${cyan}manifest.json${reset}`)
      console.log(`${approvalLabel}Manifest file copied in ${time}ms.${reset}`)
    }
  }
}

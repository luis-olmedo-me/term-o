import fs from 'fs'
import glob from 'glob'
import { performance } from 'node:perf_hooks'
import path from 'path'

import { cyan, gray, green, reset, yellow } from '../constants/system.constants'

export function flattenHtml(watch) {
  const approvalLabel = watch ? `${cyan}` : `${green}✔ `

  return {
    name: 'flatten-html-output',
    closeBundle() {
      const start = performance.now()
      const dist = path.resolve('dist')
      const htmlFiles = glob.sync('dist/src/apps/**/index.html')

      htmlFiles.forEach(file => {
        const appName = file.replace(/.*src[\\/]+apps[\\/]+/, '').replace(/[\\/]+index.html$/, '')
        const target = path.join(dist, `${appName}.html`)

        if (fs.existsSync(target)) fs.unlinkSync(target)

        fs.renameSync(file, target)
        console.log(`${gray}dist/${yellow}${appName}.html${reset}`)
      })

      const srcDir = path.join(dist, 'src')

      if (fs.existsSync(srcDir)) fs.rmSync(srcDir, { recursive: true, force: true })

      const end = performance.now()
      const time = Math.round(end - start)

      console.log(`${approvalLabel}HTML files flattened in ${time}ms.${reset}`)
    }
  }
}

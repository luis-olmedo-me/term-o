import { execSync } from 'child_process'
import fs from 'fs'
import { performance } from 'node:perf_hooks'
import path from 'path'

import { cyan, gray, green, reset, yellow } from '../constants/system.constants'

const tempDir = path.resolve(__dirname, '../../build-content')
const contentJs = path.join(tempDir, 'content.js')
const dest = path.resolve(__dirname, '../../build/assets/js/content.js')

export function buildContentScript(mode, watch) {
  const approvalLabel = watch ? `${cyan}` : `${green}✔ `

  return {
    name: 'build-content-script',

    closeBundle() {
      const existContentJs = fs.existsSync(contentJs)
      const start = performance.now()

      console.log(`${cyan}content script build started...${reset}`)

      execSync(`vite build --config vite.content.config.js --mode ${mode}`, {
        stdio: 'inherit'
      })

      if (existContentJs) {
        fs.copyFileSync(contentJs, dest)
      }

      const existTempDir = fs.existsSync(tempDir)

      if (existTempDir) fs.rmSync(tempDir, { recursive: true, force: true })

      const end = performance.now()
      const time = Math.round(end - start)

      console.log(`${gray}build/${yellow}assets/js/content.js${reset}`)
      console.log(`${approvalLabel}Content script copied and flattened in ${time}ms.${reset}`)
    }
  }
}

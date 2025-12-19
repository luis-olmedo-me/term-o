import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { cyan, reset } from '../constants/system.constants'

export function buildContentScript(mode, watch) {
  const tempDir = path.resolve(__dirname, '../../build-content')
  const contentJs = path.join(tempDir, 'content.js')
  const dest = path.resolve(__dirname, '../../build/assets/js/content.js')

  return {
    name: 'build-content-script',

    buildStart() {
      if (!fs.existsSync(contentJs)) {
        const scriptMode = mode === 'production' ? 'prod' : 'dev'

        console.log(`${cyan}content script build started...${reset}`)

        execSync(`yarn build-content-${scriptMode}`, {
          stdio: 'inherit'
        })
      }
    },

    closeBundle() {
      const existContentJs = fs.existsSync(contentJs)
      const existTempDir = fs.existsSync(tempDir)

      if (existContentJs) fs.copyFileSync(contentJs, dest)
      if (!watch && existTempDir) fs.rmSync(tempDir, { recursive: true, force: true })
    },

    buildEnd() {
      const existTempDir = fs.existsSync(tempDir)

      if (watch && existTempDir) fs.rmSync(tempDir, { recursive: true, force: true })
    }
  }
}

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { cyan, reset } from '../constants/system.constants'

const tempDir = path.resolve(__dirname, '../../build-content')
const contentJs = path.join(tempDir, 'content.js')
const dest = path.resolve(__dirname, '../../build/assets/js/content.js')

export function buildContentScript(mode) {
  return {
    name: 'build-content-script',

    buildStart() {
      if (!fs.existsSync(contentJs)) {
        console.log(`${cyan}content script build started...${reset}`)

        execSync(`vite build --config vite.content.config.js --mode ${mode}`, {
          stdio: 'inherit'
        })
      }
    },

    closeBundle() {
      const existContentJs = fs.existsSync(contentJs)

      if (existContentJs) {
        fs.copyFileSync(contentJs, dest)
      }
    }
  }
}

process.on('exit', () => {
  const existTempDir = fs.existsSync(tempDir)

  if (existTempDir) fs.rmSync(tempDir, { recursive: true, force: true })
})

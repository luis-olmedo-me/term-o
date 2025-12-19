import fs from 'fs'
import { performance } from 'node:perf_hooks'
import path from 'path'

import { cyan, green, reset } from '../constants/system.constants'

export function duplicateGlobalContentImports(watch) {
  const approvalLabel = watch ? `${cyan}` : `${green}✔ `

  return {
    name: 'duplicate-global-content-imports',
    buildStart() {
      const start = performance.now()

      const contentDir = path.resolve(__dirname, '../../src/apps/content')

      traverseDir(contentDir)

      const end = performance.now()
      const time = Math.round(end - start)

      console.log(`${approvalLabel}Reviewed content imports in ${time}ms.${reset}`)
    }
  }
}

function checkFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8')
  const importRegex = /from\s+['"]@src\//g

  if (importRegex.test(code)) {
    const relativePath = path.relative(process.cwd(), filePath)
    throw new Error(
      `Forbidden import in content app: ${relativePath}\n` +
        `   Found import from "@src/*" — content app should use only its own helpers`
    )
  }
}

function traverseDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      traverseDir(fullPath)
    } else if (/\.(js|jsx|tsx)$/.test(entry.name)) {
      checkFile(fullPath)
    }
  }
}

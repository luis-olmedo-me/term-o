import fs from 'fs'
import glob from 'glob'
import path from 'path'

export function flattenHtml() {
  return {
    name: 'flatten-html-output',
    closeBundle() {
      const dist = path.resolve('dist')
      const htmlFiles = glob.sync('dist/src/apps/**/index.html')

      htmlFiles.forEach(file => {
        const appName = file.replace(/.*src[\\/]+apps[\\/]+/, '').replace(/[\\/]+index.html$/, '')
        const target = path.join(dist, `${appName}.html`)

        if (fs.existsSync(target)) fs.unlinkSync(target)

        fs.renameSync(file, target)
        console.log(`✔ ${appName}.html`)
      })

      const srcDir = path.join(dist, 'src')

      if (fs.existsSync(srcDir)) fs.rmSync(srcDir, { recursive: true, force: true })
    }
  }
}

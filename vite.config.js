import preact from '@preact/preset-vite'
import glob from 'glob'
import { resolve } from 'path'
import { defineConfig } from 'vite'

import { buildContentScript } from './src/plugins/buildContentScript.plugin'
import { copyIcons } from './src/plugins/copyIcons.plugin'
import { copyManifest } from './src/plugins/copyManifest.plugin'
import { flattenHtml } from './src/plugins/flattenHtml.plugin'

const watch = process.argv.includes('--watch')

const htmlEntries = Object.fromEntries(
  glob.sync('src/apps/*/index.html').map(file => {
    const name = file.replace('src/apps/', '').replace('/index.html', '')

    return [name, resolve(__dirname, file)]
  })
)

const scriptEntries = {
  background: resolve(__dirname, 'src/apps/background/index.js'),
  'web-components': resolve(__dirname, 'src/apps/web-components/index.js')
}

export default defineConfig(({ mode }) => ({
  plugins: [
    preact(),
    copyIcons(watch),
    buildContentScript(mode, watch),
    copyManifest(watch),
    flattenHtml(watch)
  ],
  build: {
    outDir: 'build',
    sourcemap: mode !== 'production',
    rollupOptions: {
      input: {
        ...htmlEntries,
        ...scriptEntries
      },
      output: {
        manualChunks: () => null,
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/shared/[name].js',
        assetFileNames: assetInfo => {
          const isCss = assetInfo.names.some(name => name.endsWith('.css'))

          if (isCss) return 'assets/css/[name][extname]'

          return 'assets/[name][extname]'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@sidepanel': resolve(__dirname, 'src/apps/sidepanel'),
      '@background': resolve(__dirname, 'src/apps/background'),
      '@configuration': resolve(__dirname, 'src/apps/configuration'),
      '@web-components': resolve(__dirname, 'src/apps/web-components'),
      '@src': resolve(__dirname, 'src'),
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  }
}))

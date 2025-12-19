import preact from '@preact/preset-vite'
import glob from 'glob'
import { resolve } from 'path'
import { defineConfig } from 'vite'

const htmlEntries = Object.fromEntries(
  glob.sync('src/apps/*/index.html').map(file => {
    const name = file.replace('src/apps/', '').replace('/index.html', '')

    return [name, resolve(__dirname, file)]
  })
)

const scriptEntries = {
  background: resolve(__dirname, 'src/apps/background/index.js'),
  content: resolve(__dirname, 'src/apps/content/index.js'),
  'web-components': resolve(__dirname, 'src/apps/web-components/index.js')
}

export default defineConfig(({ mode }) => ({
  plugins: [preact()],
  build: {
    outDir: 'dist',
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
        assetFileNames: 'assets/[name][extname]'
      }
    }
  },
  resolve: {
    alias: {
      '@sidepanel': resolve(__dirname, 'src/apps/sidepanel'),
      '@background': resolve(__dirname, 'src/apps/background'),
      '@configuration': resolve(__dirname, 'src/apps/configuration'),
      '@web-components': resolve(__dirname, 'src/apps/web-components'),
      '@content': resolve(__dirname, 'src/apps/content'),
      '@src': resolve(__dirname, 'src'),
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  }
}))

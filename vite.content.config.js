import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  plugins: [],
  build: {
    outDir: 'build/temp-content',
    sourcemap: mode !== 'production',
    rollupOptions: {
      input: 'src/apps/content/index.js',
      output: {
        entryFileNames: 'content.js',
        inlineDynamicImports: true
      }
    }
  },
  resolve: {
    alias: {
      '@content': resolve(__dirname, 'src/apps/content'),
      '@src': resolve(__dirname, 'src'),
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  }
}))

import pluginJs from '@eslint/js'
import preact from 'eslint-plugin-preact'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      preact
    },
    rules: {
      ...preact.configs.recommended.rules
    }
  },
  pluginJs.configs.recommended
]

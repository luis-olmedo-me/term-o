import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    settings: {
      react: { version: '17.0' }
    }
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {
    languageOptions: { globals: { ...globals.webextensions, ...globals.browser } }
  },
  pluginJs.configs.recommended,
  pluginReactConfig
]

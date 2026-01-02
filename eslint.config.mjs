import pluginJs from '@eslint/js'
import preact from 'eslint-plugin-preact'
import react from 'eslint-plugin-react'
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
        ...globals.webextensions,
        ...globals.node
      }
    },
    plugins: {
      react,
      preact
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      semi: 'off',
      indent: 'off',
      'react/jsx-indent': 'off',
      'react/jsx-indent-props': 'off',
      'react/jsx-no-bind': 'off',
      'react/jsx-uses-vars': 'error',
      'arrow-body-style': 'off',
      'brace-style': 'off',
      'no-console': 'off',
      'prefer-arrow-callback': 'off'
    }
  },
  pluginJs.configs.recommended
]

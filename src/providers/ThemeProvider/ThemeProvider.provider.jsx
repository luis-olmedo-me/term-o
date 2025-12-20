import * as React from 'preact'
import { ThemeProvider as StyleProvider } from 'styled-components'

import useStorage from '@src/hooks/useStorage'

import { storageKeys } from '@src/constants/storage.constants'
import { createRootVariablesFromTheme } from '@src/helpers/themes.helpers'

export const ThemeProvider = ({ children }) => {
  const [config] = useStorage({ key: storageKeys.CONFIG })

  return (
    <StyleProvider theme={config.theme}>
      <style>{createRootVariablesFromTheme(config.theme)}</style>

      {children}
    </StyleProvider>
  )
}

ThemeProvider.propTypes = {
  value: Object,
  children: Array
}

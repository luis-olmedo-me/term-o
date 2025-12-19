import * as React from 'preact'
import { ThemeProvider as StyleProvider } from 'styled-components'

import useStorage from '@src/hooks/useStorage'

import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import ThemeStyle from './ThemeProvider.styles'

export const ThemeProvider = ({ children }) => {
  const [config] = useStorage({ key: storageKeys.CONFIG })

  const fontSize = config.getValueById(configInputIds.FONT_SIZE)

  return (
    <StyleProvider theme={config.theme}>
      <ThemeStyle mainFontSize={fontSize} />

      {children}
    </StyleProvider>
  )
}

ThemeProvider.propTypes = {
  value: Object,
  children: Array
}

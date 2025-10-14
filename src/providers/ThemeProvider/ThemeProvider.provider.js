import * as React from 'preact'
import { ThemeProvider as StyleProvider } from 'styled-components'

import useStorage from '@src/hooks/useStorage'

import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { defaultStyleMeasures } from '@src/constants/themes.constants'
import { getAccentColors } from '@src/helpers/themes.helpers'
import ThemeStyle from './ThemeProvider.styles'

export const ThemeProvider = ({ children }) => {
  const [config] = useStorage({ key: storageKeys.CONFIG })

  const themeName = config.getValueById(configInputIds.THEME_NAME)
  const fontSize = config.getValueById(configInputIds.FONT_SIZE)
  const fontFamily = config.getValueById(configInputIds.FONT_FAMILY)
  const colorAccent = config.getValueById(configInputIds.COLOR_ACCENT)

  const selectedTheme = config.themes.find(theme => theme.name === themeName)

  return (
    <StyleProvider
      theme={{
        ...defaultStyleMeasures,
        colors: {
          ...selectedTheme,
          ...getAccentColors(selectedTheme, colorAccent)
        },
        font: fontFamily
      }}
    >
      <ThemeStyle mainFontSize={fontSize} />

      {children}
    </StyleProvider>
  )
}

ThemeProvider.propTypes = {
  value: Object,
  children: Array
}

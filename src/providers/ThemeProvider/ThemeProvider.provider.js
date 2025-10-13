import * as React from 'preact'

import { configInputIds } from '@src/constants/config.constants'
import useConfig from '@src/hooks/useConfig'
import themer from '@src/libs/themer'
import { useEffect, useState } from 'preact/hooks'
import { ThemeProvider as StyleProvider } from 'styled-components'
import ThemeStyle from './ThemeProvider.styles'

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themer.theme)
  const [isReady, setIsReady] = useState(false)

  const config = useConfig()
  const fontSize = config.get(configInputIds.FONT_SIZE)
  const fontFamily = config.get(configInputIds.FONT_FAMILY)
  const colorAccent = config.get(configInputIds.COLOR_ACCENT)

  useEffect(function updateColorsReference() {
    const updateTheme = ({ theme }) => setTheme(theme)
    const showContent = () => setIsReady(true)

    updateTheme(themer)
    themer.addEventListener('themes-update', updateTheme)

    if (themer.isInitiated) showContent()
    else themer.addEventListener('init', showContent)

    return () => {
      themer.removeEventListener('themes-update', updateTheme)
      themer.removeEventListener('init', showContent)
    }
  }, [])

  return (
    <StyleProvider
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          ...themer.getAccentColors(colorAccent)
        },
        font: { primary: fontFamily }
      }}
    >
      <ThemeStyle mainFontSize={fontSize} />

      {isReady && children}
    </StyleProvider>
  )
}

ThemeProvider.propTypes = {
  value: Object,
  children: Array
}

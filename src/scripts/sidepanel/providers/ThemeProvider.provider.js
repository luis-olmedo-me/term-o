import * as React from 'preact'

import useConfig from '@src/hooks/useConfig'
import themer from '@src/libs/themer'
import { useEffect, useState } from 'preact/hooks'
import { ThemeProvider as StyleProvider } from 'styled-components'
import ThemeStyle from '../styles/Theme.styles'

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themer.theme)

  const { listening } = useConfig({ get: ['font-size', 'font-family'] })
  const [fontSize, fontFamily] = listening

  useEffect(function updateColorsReference() {
    const updateTheme = ({ theme }) => setTheme(theme)

    themer.addEventListener('themes-update', updateTheme)

    return () => themer.removeEventListener('themes-update', updateTheme)
  }, [])

  return (
    <StyleProvider theme={{ ...theme, font: { primary: fontFamily } }}>
      <ThemeStyle mainFontSize={fontSize} />

      {children}
    </StyleProvider>
  )
}

ThemeProvider.propTypes = {
  value: Object,
  children: Array
}

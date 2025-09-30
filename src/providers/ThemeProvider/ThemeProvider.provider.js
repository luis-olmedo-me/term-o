import * as React from 'preact'

import useConfig from '@src/hooks/useConfig'
import { configInputIds } from '@src/hooks/useConfig/useConfig.constants'
import themer from '@src/libs/themer'
import { useEffect, useState } from 'preact/hooks'
import { ThemeProvider as StyleProvider } from 'styled-components'
import ThemeStyle from './ThemeProvider.styles'

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themer.theme)
  const [isReady, setIsReady] = useState(false)

  const { listening } = useConfig({ get: [configInputIds.FONT_SIZE, configInputIds.FONT_FAMILY] })

  const [fontSize, fontFamily] = listening

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
    <StyleProvider theme={{ ...theme, font: { primary: fontFamily } }}>
      <ThemeStyle mainFontSize={fontSize} />

      {isReady && children}
    </StyleProvider>
  )
}

ThemeProvider.propTypes = {
  value: Object,
  children: Array
}

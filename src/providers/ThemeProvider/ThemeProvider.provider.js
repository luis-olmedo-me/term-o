import * as React from 'preact'

import { configInputIds } from '@src/constants/config.constants'
import { toTitleCase } from '@src/helpers/string.helpers'
import useConfig from '@src/hooks/useConfig'
import themer from '@src/libs/themer'
import { useEffect, useState } from 'preact/hooks'
import { ThemeProvider as StyleProvider } from 'styled-components'
import ThemeStyle from './ThemeProvider.styles'

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themer.theme)
  const [isReady, setIsReady] = useState(false)

  const { listening } = useConfig({
    get: [configInputIds.FONT_SIZE, configInputIds.FONT_FAMILY, configInputIds.COLOR_ACCENT]
  })

  const [fontSize, fontFamily, colorAccent] = listening

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

  const colorAccentTitleCase = toTitleCase(colorAccent)
  const brightColorAccent = `bright${colorAccentTitleCase}`

  const accent = theme.colors[colorAccent]
  const brightAccent = theme.colors[brightColorAccent]

  return (
    <StyleProvider
      theme={{
        ...theme,
        colors: {
          ...theme.colors,
          accent: accent,
          brightAccent: brightAccent
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

import * as React from 'preact'

import themer from '@src/libs/themer'
import { useEffect, useState } from 'preact/hooks'
import { ThemeProvider as StyleProvider } from 'styled-components'

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themer.theme)

  useEffect(function updateColorsReference() {
    const updateTheme = ({ theme }) => setTheme(theme)

    themer.addEventListener('themes-update', updateTheme)

    return () => themer.removeEventListener('themes-update', updateTheme)
  }, [])

  return <StyleProvider theme={theme}>{children}</StyleProvider>
}

ThemeProvider.propTypes = {
  value: Object,
  children: Array
}

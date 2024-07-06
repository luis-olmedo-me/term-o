import * as React from 'preact'

import useStorage from '@background/hooks/useStorage'
import { defaultTheme } from '@src/theme/theme.colors'
import { ThemeProvider as StyleProvider } from 'styled-components'
import { themeColorSetNameRef } from 'theme/theme.colors'

export const ThemeProvider = ({ children }) => {
  const [colorSets] = useStorage({
    namespace: 'local',
    key: 'color-sets',
    defaultValue: defaultTheme.colorsets
  })

  const [colorSetName] = useStorage({
    namespace: 'local',
    key: 'color-set-name',
    defaultValue: themeColorSetNameRef.current
  })

  const colorSet = colorSets.find(set => set.name === colorSetName)

  return <StyleProvider theme={{ ...defaultTheme, colors: colorSet }}>{children}</StyleProvider>
}

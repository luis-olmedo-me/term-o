import * as React from 'preact'

import useStorage from '@background/hooks/useStorage'
import { defaultTheme } from '@src/theme/theme.colors'
import { useEffect } from 'preact/hooks'
import { ThemeProvider as StyleProvider } from 'styled-components'
import { themeColorSetNameRef, themeColorSetsRef } from 'theme/theme.colors'

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

  useEffect(
    function updateRef() {
      return () => {
        themeColorSetNameRef.current = colorSetName
        themeColorSetsRef.current = colorSets
      }
    },
    [colorSetName, colorSets]
  )

  const colorSet = colorSets.find(set => set.name === colorSetName)

  return <StyleProvider theme={{ ...defaultTheme, colors: colorSet }}>{children}</StyleProvider>
}

import * as React from 'preact'

import useStorage from '@background/hooks/useStorage'
import colorSets from '@src/libs/color-sets'
import { defaultTheme } from '@src/theme/theme.colors'
import { useEffect } from 'preact/hooks'
import { ThemeProvider as StyleProvider } from 'styled-components'

export const ThemeProvider = ({ children }) => {
  const [updatedColorSets] = useStorage({
    namespace: 'local',
    key: 'color-sets',
    defaultValue: colorSets.colors
  })

  const [updatedColorSetName] = useStorage({
    namespace: 'local',
    key: 'color-set-name',
    defaultValue: colorSets.current
  })

  useEffect(
    function updateRef() {
      return () => {
        colorSets.setColors(updatedColorSets)
        colorSets.setCurrent(updatedColorSetName)
      }
    },
    [updatedColorSetName, updatedColorSets]
  )

  const colorSet = updatedColorSets.find(set => set.name === updatedColorSetName)
  console.log('💬  colorSet:', colorSet)

  return <StyleProvider theme={{ ...defaultTheme, colors: colorSet }}>{children}</StyleProvider>
}

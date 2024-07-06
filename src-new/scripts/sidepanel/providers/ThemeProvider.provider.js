import * as React from 'preact'

import useStorage from '@background/hooks/useStorage'
import colorSets from '@src/libs/color-sets'
import { defaultTheme } from '@src/theme/theme.colors'
import { useEffect, useState } from 'preact/hooks'
import { ThemeProvider as StyleProvider } from 'styled-components'

export const ThemeProvider = ({ children }) => {
  const [colors, setColors] = useState(colorSets.currentColorSet)

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
      colorSets.setColors(updatedColorSets)
      colorSets.setCurrent(updatedColorSetName)

      setColors(colorSets.currentColorSet)
    },
    [updatedColorSetName, updatedColorSets]
  )

  return <StyleProvider theme={{ ...defaultTheme, colors }}>{children}</StyleProvider>
}

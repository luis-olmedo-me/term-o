import * as React from 'preact'

import useStorage from '@background/hooks/useStorage'
import colorSet from '@src/libs/color-set'
import { defaultTheme } from '@src/theme/theme.colors'
import { useEffect, useState } from 'preact/hooks'
import { ThemeProvider as StyleProvider } from 'styled-components'

export const ThemeProvider = ({ children }) => {
  const [colors, setColors] = useState(colorSet.currentColorSet)

  const [updatedColorSets] = useStorage({
    namespace: 'local',
    key: 'color-sets',
    defaultValue: colorSet.colors
  })

  const [updatedColorSetName] = useStorage({
    namespace: 'local',
    key: 'color-set-name',
    defaultValue: colorSet.current
  })

  useEffect(
    function updateRef() {
      colorSet.setColors(updatedColorSets)
      colorSet.setCurrent(updatedColorSetName)

      setColors(colorSet.currentColorSet)
    },
    [updatedColorSetName, updatedColorSets]
  )

  return <StyleProvider theme={{ ...defaultTheme, colors }}>{children}</StyleProvider>
}

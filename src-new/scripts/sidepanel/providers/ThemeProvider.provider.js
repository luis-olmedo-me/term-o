import * as React from 'preact'

import useStorage from '@background/hooks/useStorage'
import colorSet, { defaultSets } from '@src/libs/color-set'
import { defaultTheme } from '@src/theme/theme.colors'
import { useEffect, useState } from 'preact/hooks'
import { ThemeProvider as StyleProvider } from 'styled-components'

export const ThemeProvider = ({ children }) => {
  const [colors, setColors] = useState(colorSet.colors)

  const [updatedColorSets] = useStorage({
    namespace: 'local',
    key: 'color-sets',
    defaultValue: defaultSets
  })

  const [updatedColorSetName] = useStorage({
    namespace: 'local',
    key: 'color-set-name',
    defaultValue: colorSet.name
  })

  useEffect(
    function updateColorsReference() {
      const newColorSetSelected = updatedColorSets.find(set => set.name === updatedColorSetName)

      colorSet.setColors(newColorSetSelected)
      setColors(colorSet.colors)
    },
    [updatedColorSetName, updatedColorSets]
  )

  return <StyleProvider theme={{ ...defaultTheme, colors }}>{children}</StyleProvider>
}

ThemeProvider.propTypes = {
  value: Object,
  children: Array
}

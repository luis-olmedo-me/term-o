import * as React from 'preact'
import { useEffect, useState } from 'preact/hooks'

import useStorage from '@background/hooks/useStorage'
import { defaultColorSetNames, defaultTheme } from '@src/theme/theme.colors'
import { ThemeProvider as StyleProvider } from 'styled-components'
import { themeColorSetNameRef } from 'theme/theme.colors'

export const ThemeProvider = ({ children }) => {
  const [colorSets, setColorSets] = useState(defaultTheme.colorsets)
  const [colorSetName, setColorSetName] = useState(themeColorSetNameRef.current)

  const isDefaultColorset = defaultColorSetNames.includes(colorSetName)

  useStorage({
    namespace: 'local',
    key: 'color-sets',
    onInit: ({ value }) => setColorSets([...defaultTheme.colorsets, ...value]),
    onUpdate: ({ newValue }) => setColorSets(oldColorSets => [...oldColorSets, newValue])
  })

  useStorage({
    namespace: 'local',
    key: 'color-set-name',
    onInit: ({ value }) => setColorSetName(value),
    onUpdate: ({ newValue }) => setColorSetName(newValue)
  })

  useEffect(
    function expectForDefaultColorSetNameChanges() {
      if (!isDefaultColorset) return

      const mediaTheme = window.matchMedia('(prefers-color-scheme: dark)')
      const handleMediaThemeChange = event => {
        const newColorSetName = event.matches ? 'Material Dark' : 'Iceberg Light'

        setColorSetName(newColorSetName)
      }

      mediaTheme.addEventListener('change', handleMediaThemeChange)

      return () => mediaTheme.removeEventListener('change', handleMediaThemeChange)
    },
    [isDefaultColorset]
  )

  const colorSet = colorSets.find(set => set.name === colorSetName)

  return <StyleProvider theme={{ ...defaultTheme, colors: colorSet }}>{children}</StyleProvider>
}

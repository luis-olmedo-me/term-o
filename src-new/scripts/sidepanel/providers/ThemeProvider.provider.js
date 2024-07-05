import { useEffect, useState } from 'preact/hooks'

import { defaultColorSetNames, defaultTheme } from '@src/theme/theme.colors'
import { isDarkModePrefered } from '@src/theme/theme.helpers'
import { ThemeProvider as StyleProvider } from 'styled-components'

const isDarkModeDefault = isDarkModePrefered()
const defaultColorsetName = isDarkModeDefault ? 'Material Dark' : 'Iceberg Light'

export const ThemeProvider = ({ children }) => {
  const [colorSets, setColorSets] = useState(defaultTheme.colorsets)
  const [colorSetName, setColorSetName] = useState(defaultColorsetName)

  const isDefaultColorset = defaultColorSetNames.includes(colorSetName)

  useEffect(function expectForColorSetsChanges() {
    const handleStorageChanges = (changes, namespace) => {
      if (namespace !== 'local') return

      for (let [key, { newValue }] of Object.entries(changes)) {
        if (key === 'colorsets') setColorSets([...defaultTheme.colorsets, ...newValue])
      }
    }

    const updateCurrentColorSets = async () => {
      const { colorsets = [] } = await chrome.storage.local.get('colorsets')

      setColorSets([...defaultTheme.colorsets, ...colorsets])
    }

    updateCurrentColorSets()
    chrome.storage.onChanged.addListener(handleStorageChanges)

    return () => chrome.storage.onChanged.removeListener(handleStorageChanges)
  }, [])

  useEffect(function expectForColorSetNameChanges() {
    const handleStorageChanges = (changes, namespace) => {
      if (namespace !== 'local') return

      for (let [key, { newValue }] of Object.entries(changes)) {
        if (key === 'colorsetname') setColorSetName(newValue)
      }
    }

    const updateCurrentColorSets = async () => {
      const { colorsetname } = await chrome.storage.local.get('colorsetname')

      if (colorsetname) setColorSetName(colorsetname)
    }

    updateCurrentColorSets()
    chrome.storage.onChanged.addListener(handleStorageChanges)

    return () => chrome.storage.onChanged.removeListener(handleStorageChanges)
  }, [])

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

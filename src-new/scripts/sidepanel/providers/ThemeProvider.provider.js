import { useEffect, useState } from 'preact/hooks'

import { defaultTheme } from '@src/theme/theme.colors'
import { ThemeProvider as StyleProvider } from 'styled-components'

export const ThemeProvider = ({ children }) => {
  const [colorSets, setColorSets] = useState([])
  console.log('💬  colorSets:', colorSets)

  useEffect(function expectForColorSetsChanges() {
    const handleStorageChanges = (changes, namespace) => {
      if (namespace !== 'local') return

      for (let [key, { newValue }] of Object.entries(changes)) {
        if (key === 'colorsets') setColorSets(newValue)
      }
    }

    const updateCurrentColorSets = async () => {
      const { colorsets = [] } = await chrome.storage.local.get('colorsets')
      setColorSets(colorsets)
    }

    updateCurrentColorSets()
    chrome.storage.onChanged.addListener(handleStorageChanges)

    return () => chrome.storage.onChanged.removeListener(handleStorageChanges)
  }, [])

  return <StyleProvider theme={defaultTheme}>{children}</StyleProvider>
}

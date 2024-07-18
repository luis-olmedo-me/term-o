import { getStorageValue } from '@background/command-handlers/storage/storage.helpers'
import { defaultlDarkMode, defaultSets } from '@src/libs/color-set/color-set.constants'

const themeManager = (function() {
  let theme = defaultlDarkMode
  let themes = defaultSets

  const handleStorageChanges = (changes, currentChanges) => {
    if (currentChanges !== 'local') return

    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      if (storageKey === 'color-sets') {
        themes = newValue
      }
      if (storageKey === 'color-set-name') {
        const newTheme = themes.find(theme => theme.name === newValue)

        theme = newTheme || theme
      }
    }
  }

  const getUserEventsFromLS = async () => {
    const newThemes = await getStorageValue('local', 'color-sets')
    const newThemeName = await getStorageValue('local', 'color-set-name')

    themes = newThemes || defaultSets

    const newTheme = themes.find(theme => theme.name === newThemeName)

    theme = newTheme || defaultlDarkMode
  }

  getUserEventsFromLS()
  chrome.storage.onChanged.addListener(handleStorageChanges)

  return { getThemes: () => themes, getTheme: () => theme }
})()

export default themeManager

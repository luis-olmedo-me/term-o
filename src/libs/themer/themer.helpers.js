export const handleStorageChanges = (changes, currentChanges) => {
  if (currentChanges !== 'local') return

  for (let [storageKey, { newValue }] of Object.entries(changes)) {
    if (storageKey === 'color-sets') {
      this.themes = newValue
    }

    if (storageKey === 'color-set-name') {
      const newTheme = this.themes.find(theme => theme.name === newValue)

      if (newTheme) this.theme = newTheme
    }
  }
}

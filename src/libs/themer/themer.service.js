import { getStorageValue } from '@src/scripts/background/command-handlers/storage/storage.helpers'
import { defaultColorTheme, defaultTheme } from './themer.constants'
import { handleStorageChanges } from './themer.helpers'

class Themer {
  constructor(defaultColors, defaultTheme) {
    this.colors = defaultColors
    this.colorSets = [defaultColors]
    this.staticTheme = defaultTheme
    this.handleStorageChanges = handleStorageChanges.bind(this)

    this.getThemesFromLS()
    chrome.storage.onChanged.addListener(this.handleStorageChanges)
  }

  theme() {
    return { ...this.staticTheme, colors: this.colors }
  }

  async getThemesFromLS() {
    const newThemes = await getStorageValue('local', 'color-sets')
    const newThemeName = await getStorageValue('local', 'color-set-name')

    if (newThemes) this.colorSets = newThemes

    const newTheme = this.colorSets.find(theme => theme.name === newThemeName)

    if (newTheme) this.colors = newTheme
  }

  destroy() {
    chrome.storage.onChanged.removeListener(this.handleStorageChanges)
  }
}

export const themer = new Themer(defaultColorTheme, defaultTheme)

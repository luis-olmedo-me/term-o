import { getStorageValue } from '@src/scripts/background/command-handlers/storage/storage.helpers'
import { defaultColorTheme, defaultTheme } from './themer.constants'
import { handleStorageChanges } from './themer.helpers'

class Themer {
  constructor(defaultColorTheme, defaultTheme) {
    this.defaultColorThemes = [defaultColorTheme]
    this.defaultColorTheme = defaultColorTheme

    this.staticTheme = defaultTheme
    this.colorTheme = defaultColorTheme
    this.colorThemes = this.defaultColorThemes

    this.handleStorageChanges = handleStorageChanges.bind(this)

    this.getThemesFromLS()
    chrome.storage.onChanged.addListener(this.handleStorageChanges)
  }

  isDefault(name) {
    return this.defaultColorThemes.some(set => set.name === name)
  }

  get defaultColorName() {
    return this.defaultColorTheme.name
  }

  get theme() {
    return { ...this.staticTheme, colors: this.colorTheme }
  }

  async getThemesFromLS() {
    const newThemes = await getStorageValue('local', 'color-sets')
    const newThemeName = await getStorageValue('local', 'color-set-name')

    if (newThemes) this.colorThemes = newThemes

    const newTheme = this.colorThemes.find(theme => theme.name === newThemeName)

    if (newTheme) this.colorTheme = newTheme
  }

  destroy() {
    chrome.storage.onChanged.removeListener(this.handleStorageChanges)
  }
}

export const themer = new Themer(defaultColorTheme, defaultTheme)

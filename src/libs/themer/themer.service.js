import {
  getStorageValue,
  setStorageValue
} from '@src/scripts/background/command-handlers/storage/storage.helpers'
import EventListener from '../command-parser/sub-services/event-listener'
import { defaultColorTheme, defaultTheme } from './themer.constants'

class Themer extends EventListener {
  constructor(defaultColorTheme, defaultTheme) {
    super()

    this.defaultColorThemes = [defaultColorTheme]
    this.defaultColorTheme = defaultColorTheme

    this.staticTheme = defaultTheme
    this.colorTheme = defaultColorTheme
    this.colorThemes = this.defaultColorThemes

    this.handleStorageChanges = this.handleStorageChanges.bind(this)

    this.getThemesFromLS()
    chrome.storage.onChanged.addListener(this.handleStorageChanges)
  }

  get defaultColorName() {
    return this.defaultColorTheme.name
  }

  get theme() {
    return { ...this.staticTheme, colors: this.colorTheme }
  }

  isDefault(name) {
    return this.defaultColorThemes.some(set => set.name === name)
  }

  getColor(colorName) {
    return this.colorTheme[colorName]
  }

  handleStorageChanges(changes, currentChanges) {
    if (currentChanges !== 'local') return

    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      if (storageKey === 'color-sets') {
        this.colorThemes = newValue
        this.dispatchEvent('themes-update', { theme: this.theme })
      }

      if (storageKey === 'color-set-name') {
        const newTheme = this.colorThemes.find(theme => theme.name === newValue)

        if (newTheme) {
          this.colorTheme = newTheme
          this.dispatchEvent('themes-update', { theme: this.theme })
        }
      }
    }
  }

  async getThemesFromLS() {
    const newThemes = await getStorageValue('local', 'color-sets')
    const newThemeName = await getStorageValue('local', 'color-set-name')

    if (newThemes) this.colorThemes = newThemes

    const newTheme = this.colorThemes.find(theme => theme.name === newThemeName)

    if (newTheme) this.colorTheme = newTheme
  }

  applyColorTheme(name) {
    const newTheme = this.colorThemes.find(theme => theme.name === name)
    if (newTheme) this.colorTheme = newTheme

    return setStorageValue('local', 'color-set-name', name)
  }

  addColorTheme(newTheme) {
    const newColorThemes = this.colorThemes.concat(newTheme)
    this.colorThemes = newColorThemes

    return setStorageValue('local', 'color-sets', newColorThemes)
  }

  removeColorTheme(name) {
    const newColorThemes = this.colorThemes.filter(set => set.name !== name)
    this.colorThemes = newColorThemes

    return setStorageValue('local', 'color-sets', newColorThemes)
  }

  destroy() {
    chrome.storage.onChanged.removeListener(this.handleStorageChanges)
  }
}

export const themer = new Themer(defaultColorTheme, defaultTheme)

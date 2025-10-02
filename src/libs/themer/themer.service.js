import EventListener from '@src/libs/event-listener'

import { configIds, configInputIds, defaultConfigSections } from '@src/constants/config.constants'
import { storageKeys, storageNamespaces } from '@src/constants/storage.constants'
import { defaultColorTheme, defaultTheme } from '@src/constants/themes.constants'
import { getConfigValueByInputId, updateConfigValueIn } from '@src/helpers/config.helpers'
import { getStorageValue, setStorageValue } from '@src/helpers/storage.helpers'

class Themer extends EventListener {
  constructor(defaultColorTheme, defaultTheme) {
    super()

    this.isInitiated = false
    this.defaultColorThemes = [defaultColorTheme]
    this.defaultColorTheme = defaultColorTheme

    this.staticTheme = defaultTheme
    this.colorTheme = defaultColorTheme
    this.colorThemes = this.defaultColorThemes

    this.handleStorageChanges = this.handleStorageChanges.bind(this)

    this.getThemesFromLS().then(this.handleInit.bind(this))
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

  handleInit() {
    this.isInitiated = true
    this.dispatchEvent('init')
  }

  handleStorageChanges(changes, currentChanges) {
    if (currentChanges !== storageNamespaces.LOCAL) return

    for (let [storageKey, { newValue }] of Object.entries(changes)) {
      if (storageKey === storageKeys.COLOR_SETS) {
        this.colorThemes = newValue
        this.dispatchEvent('themes-update', this)
      }

      if (storageKey === storageKeys.CONFIG) {
        const newThemeName = getConfigValueByInputId(configInputIds.THEME_NAME, newValue)
        const newTheme = this.colorThemes.find(theme => theme.name === newThemeName)

        if (newTheme && newThemeName !== this.theme.name) {
          this.colorTheme = newTheme
          this.dispatchEvent('themes-update', this)
        }
      }
    }
  }

  async getThemesFromLS() {
    const config = await getStorageValue(
      storageNamespaces.LOCAL,
      storageKeys.CONFIG,
      defaultConfigSections
    )

    const newThemes = await getStorageValue(storageNamespaces.LOCAL, storageKeys.COLOR_SETS)
    const newThemeName = getConfigValueByInputId(configInputIds.THEME_NAME, config)

    if (newThemes) this.colorThemes = newThemes

    const newTheme = this.colorThemes.find(theme => theme.name === newThemeName)

    if (newTheme) this.colorTheme = newTheme
    this.dispatchEvent('themes-update', this)
  }

  async applyColorTheme(name) {
    const newTheme = this.colorThemes.find(theme => theme.name === name)
    if (newTheme) this.colorTheme = newTheme

    const config = await getStorageValue(
      storageNamespaces.LOCAL,
      storageKeys.CONFIG,
      defaultConfigSections
    )
    const newConfig = updateConfigValueIn(
      config,
      configIds.APPEARENCE,
      configInputIds.THEME_NAME,
      name
    )

    return setStorageValue(storageNamespaces.LOCAL, storageKeys.CONFIG, newConfig)
  }

  addColorTheme(newTheme) {
    const newColorThemes = this.colorThemes.concat(newTheme)
    this.colorThemes = newColorThemes

    return setStorageValue(storageNamespaces.LOCAL, storageKeys.COLOR_SETS, newColorThemes)
  }

  removeColorTheme(name) {
    const newColorThemes = this.colorThemes.filter(set => set.name !== name)
    this.colorThemes = newColorThemes

    return setStorageValue(storageNamespaces.LOCAL, storageKeys.COLOR_SETS, newColorThemes)
  }

  destroy() {
    chrome.storage.onChanged.removeListener(this.handleStorageChanges)
  }
}

export const themer = new Themer(defaultColorTheme, defaultTheme)

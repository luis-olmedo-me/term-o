import StorageSimple from '@src/templates/StorageSimple'

import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { defaultStyleMeasures } from '@src/constants/themes.constants'
import {
  buildDetailedConfig,
  getConfigValueByInputId,
  updateConfigValueIn
} from '@src/helpers/config.helpers'
import { getAccentColors } from '@src/helpers/themes.helpers'
import { isDarkTheme } from '@src/helpers/utils.helpers'

export class StorageConfig extends StorageSimple {
  constructor(storageService, props) {
    super(storageService, props)

    this.details = buildDetailedConfig(props.storageValue.value)

    this.handleInitRef = this.handleInit.bind(this)
    this.handleThemesChangesRef = this.handleThemesChanges.bind(this)

    this.$storageService.addEventListener('init', this.handleInitRef)
  }

  get $value() {
    return {
      getValueById: this.getValueById.bind(this),
      removeTheme: this.removeTheme.bind(this),
      addTheme: this.addTheme.bind(this),
      change: this.change.bind(this),
      reset: this.reset.bind(this),
      themes: this.themes(),
      theme: this.theme(),
      details: this.details
    }
  }

  $update(storageValue) {
    if (this.$storageValue.version === storageValue.version) return

    this.$storageValue = storageValue
    this.details = buildDetailedConfig(storageValue.value)
  }

  handleInit() {
    this.$storageService.removeEventListener('init', this.handleInitRef)
    this.$storageService.addEventListener(storageKeys.THEMES, this.handleThemesChangesRef)
  }
  handleThemesChanges() {
    this.$storageService.dispatchEvent(storageKeys.CONFIG, this.$storageService)
  }

  getValueById(inputId) {
    return getConfigValueByInputId(this.$latest().value, inputId)
  }

  change(inputId, newValue) {
    const newConfig = updateConfigValueIn(this.$latest().value, inputId, newValue)

    this.$storageService.set(storageKeys.CONFIG, newConfig)
    this.$storageService.dispatchEvent(`${storageKeys.CONFIG}_${inputId}`, this.$storageService)
  }

  reset() {
    this.$storageService.set(storageKeys.CONFIG, [])
  }

  themes() {
    return this.$storageService.get(storageKeys.THEMES)
  }

  theme() {
    const themeName = this.getValueById(configInputIds.THEME_NAME)
    const fontFamily = this.getValueById(configInputIds.FONT_FAMILY)
    const colorAccent = this.getValueById(configInputIds.COLOR_ACCENT)
    const fontSize = this.getValueById(configInputIds.FONT_SIZE)

    const selectedTheme = this.themes().find(theme => theme.name === themeName)
    const accentColors = getAccentColors(selectedTheme, colorAccent)

    return {
      ...defaultStyleMeasures,
      colors: { ...selectedTheme, ...accentColors },
      font: fontFamily,
      fontSizeSelected: `${fontSize}px`,
      isDarkMode: isDarkTheme(selectedTheme.background)
    }
  }

  removeTheme(name) {
    const newThemes = this.themes().filter(theme => theme.name !== name)

    this.$storageService.set(storageKeys.THEMES, newThemes)
  }

  addTheme(newTheme) {
    const newThemes = this.themes().concat(newTheme)

    this.$storageService.set(storageKeys.THEMES, newThemes)
  }
}

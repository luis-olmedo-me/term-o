import StorageSimple from '@src/templates/StorageSimple'

import { storageKeys } from '@src/constants/storage.constants'
import {
  buildDetailedConfig,
  getConfigValueByInputId,
  updateConfigValueIn
} from '@src/helpers/config.helpers'

export class StorageConfig extends StorageSimple {
  constructor(storageService, storageValue) {
    super(storageService, storageValue)

    this.details = buildDetailedConfig(storageValue.value)

    this.handleInitRef = this.handleInit.bind(this)
    this.handleThemesChangesRef = this.handleThemesChanges.bind(this)

    this.storageService.addEventListener('init', this.handleInitRef)
  }

  get value() {
    return {
      getValueById: this.getValueById.bind(this),
      removeTheme: this.removeTheme.bind(this),
      addTheme: this.addTheme.bind(this),
      change: this.change.bind(this),
      reset: this.reset.bind(this),
      themes: this.themes(),
      details: this.details
    }
  }

  update(storageValue) {
    if (this.storageValue.version === storageValue.version) return

    this.storageValue = storageValue
    this.details = buildDetailedConfig(storageValue.value)
  }

  handleInit() {
    this.storageService.removeEventListener('init', this.handleInitRef)
    this.storageService.addEventListener(storageKeys.THEMES, this.handleThemesChangesRef)
  }
  handleThemesChanges() {
    this.storageService.dispatchEvent(storageKeys.CONFIG, this.storageService)
  }

  getValueById(inputId) {
    return getConfigValueByInputId(this.latest().value, inputId)
  }

  change(inputId, newValue) {
    const newConfig = updateConfigValueIn(this.latest().value, inputId, newValue)

    this.storageService.set(storageKeys.CONFIG, newConfig)
  }

  reset() {
    this.storageService.set(storageKeys.CONFIG, [])
  }

  themes() {
    return this.storageService.get(storageKeys.THEMES)
  }

  removeTheme(name) {
    const newThemes = this.themes().filter(theme => theme.name !== name)

    this.storageService.set(storageKeys.THEMES, newThemes)
  }

  addTheme(newTheme) {
    const newThemes = this.themes().concat(newTheme)

    this.storageService.set(storageKeys.THEMES, newThemes)
  }
}

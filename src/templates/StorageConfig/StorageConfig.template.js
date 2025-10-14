import StorageSimple from '@src/templates/StorageSimple'

import { storageKeys } from '@src/constants/storage.constants'
import {
  buildDetailedConfig,
  getConfigValueByInputId,
  updateConfigValueIn
} from '@src/helpers/config.helpers'

export class StorageConfig extends StorageSimple {
  constructor(storageService, value) {
    super(storageService, value)

    this.details = buildDetailedConfig(value)
    this.themes = null

    this.handleInitRef = this.handleInit.bind(this)
    this.handleThemesChangesRef = this.handleThemesChanges.bind(this)

    if (this.storageService.initiated) this.handleInit()
    else this.storageService.addEventListener('init', this.handleInitRef)
  }

  handleInit() {
    this.themes = this.storageService.get(storageKeys.COLOR_SETS)

    this.storageService.addEventListener(storageKeys.COLOR_SETS, this.handleThemesChangesRef)
  }
  handleThemesChanges() {
    this.themes = this.storageService.get(storageKeys.COLOR_SETS)
  }

  replicate(value) {
    this.storageService.removeEventListener('init', this.handleInitRef)
    this.storageService.removeEventListener(storageKeys.COLOR_SETS, this.handleThemesChangesRef)

    return new StorageConfig(this.storageService, value)
  }

  get() {
    return this
  }

  getValueById(inputId) {
    return getConfigValueByInputId(this.value, inputId)
  }

  change(inputId, newValue) {
    const newConfig = updateConfigValueIn(this.value, inputId, newValue)

    this.storageService.set(storageKeys.CONFIG, newConfig)
  }

  reset() {
    this.storageService.set(storageKeys.CONFIG, [])
  }

  themes() {
    return this.themes
  }
}

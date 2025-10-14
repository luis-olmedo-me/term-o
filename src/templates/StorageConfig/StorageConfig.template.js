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
    this.themes = null

    this.handleInitRef = this.handleInit.bind(this)
    this.handleThemesChangesRef = this.handleThemesChanges.bind(this)

    if (this.storageService.initiated) this.handleInit()
    else this.storageService.addEventListener('init', this.handleInitRef)
  }

  get value() {
    return {
      getValueById: this.getValueById.bind(this),
      change: this.change.bind(this),
      reset: this.reset.bind(this),
      details: this.details,
      themes: this.themes
    }
  }

  update(storageValue) {
    if (this.storageValue.version === storageValue.version) return

    this.storageValue = storageValue
    this.details = buildDetailedConfig(storageValue.value)
  }

  handleInit() {
    this.themes = this.storageService.get(storageKeys.COLOR_SETS)

    this.storageService.addEventListener(storageKeys.COLOR_SETS, this.handleThemesChangesRef)
  }
  handleThemesChanges() {
    this.themes = this.storageService.get(storageKeys.COLOR_SETS)

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
    return this.themes
  }
}

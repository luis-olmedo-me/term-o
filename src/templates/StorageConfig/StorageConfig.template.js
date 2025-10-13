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
  }

  replicate(value) {
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
}

import { storageKeys } from '@src/constants/storage.constants'
import {
  buildDetailedConfig,
  getConfigValueByInputId,
  updateConfigValueIn
} from '@src/helpers/config.helpers'

export class Configuration {
  constructor(storageService, value) {
    this.storageService = storageService
    this.value = value
    this.details = buildDetailedConfig(value)
  }

  set(value) {
    this.value = value
    this.details = buildDetailedConfig(value)
  }

  get(inputId) {
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

import SimpleApi from '@src/templates/SimpleApi'

import { storageKeys } from '@src/constants/storage.constants'
import {
  buildDetailedConfig,
  getConfigValueByInputId,
  updateConfigValueIn
} from '@src/helpers/config.helpers'

export class ConfigApi extends SimpleApi {
  constructor(storageService, value) {
    super(storageService, value)

    this.details = buildDetailedConfig(value)
  }

  getById(inputId) {
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

import StorageSimple from '@src/templates/StorageSimple'

import { createInternalTab } from '@src/helpers/tabs.helpers'

export class StorageTab extends StorageSimple {
  $update(storageValue) {
    if (storageValue.version === this.$storageValue.version) return

    this.$storageValue = { ...storageValue, value: createInternalTab(storageValue.value) }
  }
}

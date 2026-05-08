import StorageSimple from '@src/templates/StorageSimple'

import { createInternalTab } from '@src/helpers/tabs.helpers'

export class StorageTab extends StorageSimple {
  $interceptUpdate(newStorageValue) {
    return { ...newStorageValue, value: createInternalTab(newStorageValue.value) }
  }
}

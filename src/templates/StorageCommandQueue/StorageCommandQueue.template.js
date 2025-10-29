import StorageSimple from '@src/templates/StorageSimple'

import { storageKeys } from '@src/constants/storage.constants'
import { updateQueueValueIn } from '@src/helpers/queue.helpers'
import { createUUIDv4 } from '@src/helpers/utils.helpers'

export class StorageCommandQueue extends StorageSimple {
  constructor(storageService, storageValue) {
    super(storageService, storageValue)
  }

  get value() {
    return {
      value: this.getUIValues(),
      managed: this.latest().value,
      change: this.change.bind(this),
      add: this.add.bind(this)
    }
  }

  getUIValues() {
    return this.latest()
      .value.map(item => item.command)
      .filter(Boolean)
  }

  add(line, origin) {
    const newValue = [...this.latest().value, { id: createUUIDv4(), line, origin, command: null }]

    this.storageService.set(storageKeys.COMMAND_QUEUE, newValue)
  }

  change(queueId, newValue) {
    const newQueue = updateQueueValueIn(this.latest().value, queueId, newValue)

    this.storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
  }
}

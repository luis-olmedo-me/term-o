import StorageSimple from '@src/templates/StorageSimple'

import { commandStatuses } from '@src/constants/command.constants'
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

    this.evalPushExecution()
  }

  change(queueId, command) {
    const newQueue = updateQueueValueIn(this.latest().value, queueId, command)

    this.storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
  }

  evalPushExecution() {
    const isExecuting = this.getUIValues().some(
      ({ command }) => command?.status === commandStatuses.EXECUTING
    )

    if (isExecuting) return

    this.storageService.dispatchEvent('queue-push-execute', this.storageService)
  }
}

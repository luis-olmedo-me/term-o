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
      isExecuting: this.getIsExecuting(),
      executable: this.getExecutable(),
      managed: this.latest().value,
      clearCompleted: this.clearCompleted.bind(this),
      delete: this.delete.bind(this),
      change: this.change.bind(this),
      add: this.add.bind(this)
    }
  }

  change(queueId, command) {
    const newQueue = updateQueueValueIn(this.latest().value, queueId, command)

    this.storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
  }

  clearCompleted() {
    const newQueue = this.latest().value.filter(
      ({ command }) => !command || command.status === commandStatuses.EXECUTING
    )

    this.storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
  }

  delete(queueId) {
    const newQueue = this.latest().value.filter(({ id }) => id !== queueId)

    this.storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
  }

  add(line, origin) {
    const newValue = [...this.latest().value, { id: createUUIDv4(), line, origin, command: null }]

    this.storageService.set(storageKeys.COMMAND_QUEUE, newValue)
  }

  getUIValues() {
    return this.latest()
      .value.map(item => item.command)
      .filter(Boolean)
  }

  getIsExecuting() {
    return this.latest().value.some(({ command }) => command?.status === commandStatuses.EXECUTING)
  }

  getExecutable() {
    return this.latest().value.find(({ command }) => !command)
  }
}

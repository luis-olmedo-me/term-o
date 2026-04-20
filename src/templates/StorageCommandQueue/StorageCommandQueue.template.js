import StorageSimple from '@src/templates/StorageSimple'

import { bannerTypes } from '@src/constants/banners.constants'
import { commandStatuses } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { limitQueueByConfig, updateQueueValueIn } from '@src/helpers/queue.helpers'
import { createUUIDv4 } from '@src/helpers/utils.helpers'

export class StorageCommandQueue extends StorageSimple {
  constructor(storageService, props) {
    super(storageService, props)

    this.handleInitRef = this.handleInit.bind(this)
    this.handleConfigChangesRef = this.handleConfigChanges.bind(this)
  }

  get $value() {
    return {
      managed: this.$latest().value,
      value: this.getUIValues(),
      discardedCount: this.getDiscardedCount(),
      isExecuting: this.getIsExecuting(),
      executable: this.getExecutable(),
      clearCompleted: this.clearCompleted.bind(this),
      delete: this.delete.bind(this),
      change: this.change.bind(this),
      add: this.add.bind(this)
    }
  }

  change(queueId, command) {
    const config = this.$storageService.get(storageKeys.CONFIG)
    const banners = this.$storageService.get(storageKeys.BANNERS)

    const maxLinesPerCommand = config.getValueById(configInputIds.MAX_LINES_PER_COMMAND)

    const newQueue = updateQueueValueIn(this.$latest().value, queueId, command)
    const [limitNewQueue, discardedCount] = limitQueueByConfig(newQueue, maxLinesPerCommand)

    if (discardedCount) {
      banners.addOrUpdate({
        message: `${discardedCount} lines were discarded.`,
        type: bannerTypes.WARNING,
        duration: 5_000,
        id: 'command-exceed-warning'
      })
    }

    this.$storageService.set(storageKeys.COMMAND_QUEUE, limitNewQueue)
  }

  handleInit() {
    this.$storageService.removeEventListener('init', this.handleInitRef)
    this.$storageService.addEventListener(storageKeys.CONFIG, this.handleConfigChangesRef)
  }
  handleConfigChanges() {
    this.$storageService.set(storageKeys.COMMAND_QUEUE, this.$latest().value)
  }

  clearCompleted() {
    const newQueue = this.$latest().value.filter(
      ({ command }) => !command || command.status === commandStatuses.EXECUTING
    )

    this.$storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
  }

  delete(queueId) {
    const newQueue = this.$latest().value.filter(({ id }) => id !== queueId)

    this.$storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
  }

  add(line, origin, tab, eventType = null) {
    const newValue = [
      ...this.$latest().value,
      { id: createUUIDv4(), line, origin, tab, eventType, command: null }
    ]

    this.$storageService.set(storageKeys.COMMAND_QUEUE, newValue)
  }

  getUIValues() {
    return this.$latest()
      .value.map(item => item.command)
      .filter(Boolean)
  }

  getDiscardedCount() {
    const foundCount = this.$latest().value.find(item => item.command?.discardedCount)

    return foundCount ?? 0
  }

  getIsExecuting() {
    return this.$latest().value.some(({ command }) => command?.status === commandStatuses.EXECUTING)
  }

  getExecutable() {
    return this.$latest().value.find(({ command }) => !command)
  }
}

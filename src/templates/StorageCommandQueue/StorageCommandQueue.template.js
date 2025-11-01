import StorageSimple from '@src/templates/StorageSimple'

import { commandStatuses } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { limitSimplifiedCommands } from '@src/helpers/command.helpers'
import { updateQueueValueIn } from '@src/helpers/queue.helpers'
import { createUUIDv4 } from '@src/helpers/utils.helpers'

export class StorageCommandQueue extends StorageSimple {
  constructor(storageService, storageValue) {
    super(storageService, storageValue)

    this.handleInitRef = this.handleInit.bind(this)
    this.handleConfigChangesRef = this.handleConfigChanges.bind(this)
  }

  get $value() {
    return {
      managed: this.$latest().value,
      value: this.getUIValues(),
      isExecuting: this.getIsExecuting(),
      executable: this.getExecutable(),
      clearCompleted: this.clearCompleted.bind(this),
      delete: this.delete.bind(this),
      change: this.change.bind(this),
      add: this.add.bind(this)
    }
  }

  change(queueId, command) {
    const newQueue = updateQueueValueIn(this.$latest().value, queueId, command)

    this.$storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
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

  add(line, origin, tab) {
    const newValue = [
      ...this.$latest().value,
      { id: createUUIDv4(), line, origin, tab, command: null }
    ]

    this.$storageService.set(storageKeys.COMMAND_QUEUE, newValue)
  }

  getUIValues() {
    const config = this.$storageService.get(storageKeys.CONFIG)

    const maxLinesPerCommand = config.getValueById(configInputIds.MAX_LINES_PER_COMMAND)
    const commands = this.$latest()
      .value.map(item => item.command)
      .filter(Boolean)

    return limitSimplifiedCommands(commands, maxLinesPerCommand)
  }

  getIsExecuting() {
    return this.$latest().value.some(({ command }) => command?.status === commandStatuses.EXECUTING)
  }

  getExecutable() {
    return this.$latest().value.find(({ command }) => !command)
  }
}

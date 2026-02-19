import StorageSimple from '@src/templates/StorageSimple'

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
      latestRequest: this.getLatestRequest(),
      isExecuting: this.getIsExecuting(),
      executable: this.getExecutable(),
      clearCompleted: this.clearCompleted.bind(this),
      delete: this.delete.bind(this),
      change: this.change.bind(this),
      add: this.add.bind(this),
      request: this.request.bind(this),
      solveRequest: this.solveRequest.bind(this)
    }
  }

  change(queueId, command) {
    const config = this.$storageService.get(storageKeys.CONFIG)

    const maxLinesPerCommand = config.getValueById(configInputIds.MAX_LINES_PER_COMMAND)

    const newQueue = updateQueueValueIn(this.$latest().value, queueId, command)
    const limitNewQueue = limitQueueByConfig(newQueue, maxLinesPerCommand)

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

  add(line, origin, tab) {
    const newValue = [
      ...this.$latest().value,
      { id: createUUIDv4(), line, origin, tab, command: null, request: null }
    ]

    this.$storageService.set(storageKeys.COMMAND_QUEUE, newValue)
  }

  async request({ title, type, id }) {
    const request = { title, type, id, finished: false, response: null }
    const newQueue = this.$latest().value.map(queueItem =>
      queueItem.command?.id === id ? { ...queueItem, request } : queueItem
    )

    return new Promise(resolve => {
      const handleChange = updatedStorage => {
        const queue = updatedStorage.get(storageKeys.COMMAND_QUEUE)
        const foundRequest = queue.managed.find(queueItem => queueItem.command?.id === request.id)

        if (!foundRequest?.finished) return
        this.$storageService.removeEventListener(storageKeys.COMMAND_QUEUE, handleChange)
        this.clearRequest()

        resolve(foundRequest.response)
      }

      this.$storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
      this.$storageService.addEventListener(storageKeys.COMMAND_QUEUE, handleChange)
    })
  }

  getUIValues() {
    return this.$latest()
      .value.map(item => item.command)
      .filter(Boolean)
  }

  getIsExecuting() {
    return this.$latest().value.some(({ command }) => command?.status === commandStatuses.EXECUTING)
  }

  getLatestRequest() {
    const queueItem = this.$latest().value.find(
      ({ request }) => request !== null && !request.finished
    )

    return queueItem?.request ?? null
  }

  clearRequest(id) {
    const newQueue = this.$latest().value.map(queueItem =>
      queueItem.id === id ? { ...queueItem, request: null } : queueItem
    )

    this.$storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
  }

  solveRequest(id, response) {
    const newQueue = this.$latest().value.map(queueItem =>
      queueItem.request?.id === id
        ? { ...queueItem, request: { ...queueItem.request, finished: true, response } }
        : queueItem
    )

    this.$storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
  }

  getExecutable() {
    return this.$latest().value.find(({ command }) => !command)
  }
}

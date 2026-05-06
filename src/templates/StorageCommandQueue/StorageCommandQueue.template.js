import StorageSimple from '@src/templates/StorageSimple'

import { bannerIds, bannerTypes } from '@src/constants/banners.constants'
import { commandStatuses } from '@src/constants/command.constants'
import { configInputIds } from '@src/constants/config.constants'
import { queueStatuses, visibleStatuses } from '@src/constants/queue.constants'
import { storageKeys } from '@src/constants/storage.constants'
import { limitQueueByConfig, updateQueueValueIn } from '@src/helpers/queue.helpers'
import { createUUIDv4 } from '@src/helpers/utils.helpers'

export class StorageCommandQueue extends StorageSimple {
  constructor(storageService, props) {
    super(storageService, props)

    this.handleInitRef = this.handleInit.bind(this)
    this.handleConfigChangesRef = this.handleConfigChanges.bind(this)
    this._cache = []
  }

  get $value() {
    return {
      managed: this.$latest().value,
      value: this.getUIValues(),
      isExecuting: this.getIsExecuting(),
      next: this.next.bind(this),
      complete: this.complete.bind(this),
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
    const currentQueue = this.getFromCache(command.id) || this.$latest().value
    const isFinished = [commandStatuses.ERROR, commandStatuses.DONE].includes(command.status)

    const newQueue = updateQueueValueIn(currentQueue, queueId, command)
    const [limitNewQueue, discardedCount] = limitQueueByConfig(newQueue, maxLinesPerCommand)

    if (!isFinished) this.saveInCache(command.id, newQueue)
    if (isFinished) this.deleteInCache(command.id)
    if (isFinished && discardedCount) {
      banners.addOrUpdate({
        message: `${discardedCount} lines were discarded.`,
        type: bannerTypes.WARNING,
        duration: 5_000,
        id: bannerIds.COMMAND_LOG_OVERFLOW
      })
    }

    this.$storageService.set(storageKeys.COMMAND_QUEUE, limitNewQueue)
  }

  saveInCache(id, queue) {
    const alreadyExists = this._cache.some(item => item.id === id)

    this._cache = alreadyExists
      ? this._cache.map(item => (item.id === id ? { ...item, queue } : item))
      : this._cache.concat({ id, queue })
  }

  deleteInCache(id) {
    this._cache = this._cache.filter(item => item.id === id)
  }

  getFromCache(id) {
    const found = this._cache.find(item => item.id === id)

    return found?.queue ?? null
  }

  handleInit() {
    this.$storageService.removeEventListener('init', this.handleInitRef)
    this.$storageService.addEventListener(storageKeys.CONFIG, this.handleConfigChangesRef)
  }
  handleConfigChanges() {
    this.$storageService.set(storageKeys.COMMAND_QUEUE, this.$latest().value)
  }

  clearCompleted() {
    const banners = this.$storageService.get(storageKeys.BANNERS)

    const newQueue = this.$latest().value.filter(
      ({ command }) =>
        !command ||
        command.status === commandStatuses.EXECUTING ||
        command.status === commandStatuses.IDLE
    )
    const current = newQueue.map(item => item.id)
    const newCache = this._cache.filter(item => current.includes(item.id))

    this._cache = newCache
    this.$storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
    banners.remove(bannerIds.COMMAND_LOG_OVERFLOW)
  }

  delete(queueId) {
    const newQueue = this.$latest().value.filter(({ id }) => id !== queueId)

    this.$storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
  }

  add(line, origin, tab, event = null) {
    const id = createUUIDv4()
    const command = null
    const status = queueStatuses.SCHEDULED

    const newValue = [...this.$latest().value, { id, line, origin, tab, event, status, command }]

    this.$storageService.set(storageKeys.COMMAND_QUEUE, newValue)
  }

  getUIValues() {
    return this.$latest().value.reduce((commands, item) => {
      const isItemVisible = visibleStatuses.includes(item.status)
      const isValidCommand = Boolean(item.command)

      return isItemVisible && isValidCommand ? commands.concat(item.command) : commands
    }, [])
  }

  getIsExecuting() {
    const queue = this.$latest().value
    const hasItemInProgress = queue.some(({ status }) => status === queueStatuses.IN_PROGRESS)

    return hasItemInProgress
  }

  complete(queueId) {
    const queue = this.$latest().value
    const newQueue = queue.map(item =>
      item.id === queueId ? { ...item, status: queueStatuses.DONE } : item
    )

    this.$storageService.set(storageKeys.COMMAND_QUEUE, newQueue)
  }

  next() {
    const queue = this.$latest().value
    const isExecuting = this.getIsExecuting()

    if (isExecuting) return null
    const nextItem = queue.find(({ status }) => status === queueStatuses.SCHEDULED)

    if (!nextItem) return null
    const newQueue = queue.map(item =>
      item.id === nextItem.id ? { ...item, status: queueStatuses.IN_PROGRESS } : item
    )

    this.$storageService.set(storageKeys.COMMAND_QUEUE, newQueue)

    return nextItem
  }
}

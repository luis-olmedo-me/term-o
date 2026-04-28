import EventListener from '@src/templates/EventListener'

import { createUUIDv4, debounce } from '@src/helpers/utils.helpers'
import { getCommandListLogs, getCommandListStatus } from './CommandList.helpers'

export class CommandList extends EventListener {
  constructor({ metadata }) {
    super()

    this._id = createUUIDv4()
    this._nodes = []
    this._shared = metadata
    this._timerId = null
  }

  get status() {
    return getCommandListStatus(this._nodes)
  }

  get(key) {
    return this._shared[key] ?? null
  }

  add(newItem) {
    this._nodes = this._nodes.concat(newItem)
  }

  share(newSharedData) {
    this._shared = { ...this._shared, ...newSharedData }

    return this
  }

  async execute() {
    this._timerId = null
    const debouncedOnUpdate = debounce(this._onUpdate.bind(this), 50)
    const registerTimerId = () => (this._timerId = debouncedOnUpdate())

    for (const command of this._nodes) {
      if (command.failed) break
      command.share(this._shared)
      command.addEventListener('update', registerTimerId)
      command.addEventListener('statuschange', registerTimerId)

      await command.execute()

      command.removeEventListener('update', registerTimerId)
      command.removeEventListener('statuschange', registerTimerId)
      if (command.failed) break
    }

    if (this._timerId === null) return
    clearTimeout(this._timerId)
    this._onUpdate()
  }

  toJSON(options = {}) {
    const { flat } = options

    return {
      id: this._id,
      status: this.status,
      logs: getCommandListLogs(this._nodes, { flat }),
      context: this.get('context'),
      origin: this.get('origin'),
      title: this.get('title'),
      event: this.get('eventType')
    }
  }

  _onUpdate() {
    this.dispatchEvent('update', this)
  }
}

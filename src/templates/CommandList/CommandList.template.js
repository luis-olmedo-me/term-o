import EventListener from '@src/templates/EventListener'

import { createUUIDv4, debounce } from '@src/helpers/utils.helpers'
import { getCommandListLogs, getCommandListStatus } from './CommandList.helpers'

export class CommandList extends EventListener {
  constructor({ metadata }) {
    super()

    this._id = createUUIDv4()
    this._nodes = []
    this._shared = metadata
  }

  get status() {
    return getCommandListStatus(this._nodes)
  }

  add(newItem) {
    this._nodes = this._nodes.concat(newItem)
  }

  share(newSharedData) {
    this._shared = { ...this._shared, ...newSharedData }

    return this
  }

  async execute() {
    const debouncedOnUpdate = debounce(this._onUpdate.bind(this), 50)

    for (const command of this._nodes) {
      if (command.failed) break
      command.share(this._shared)
      command.addEventListener('update', debouncedOnUpdate)
      command.addEventListener('statuschange', debouncedOnUpdate)

      await command.execute()

      command.removeEventListener('update', debouncedOnUpdate)
      command.removeEventListener('statuschange', debouncedOnUpdate)
      if (command.failed) break
    }
  }

  toJSON(options) {
    const { flat } = options || {}

    return {
      id: this._id,
      status: this.status,
      logs: getCommandListLogs(this._nodes, { flat })
    }
  }

  _onUpdate() {
    this.dispatchEvent('update', this)
  }
}

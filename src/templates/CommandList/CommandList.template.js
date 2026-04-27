import { createUUIDv4, debounce } from '@src/helpers/utils.helpers'
import EventListener from '@src/templates/EventListener'

export class CommandList extends EventListener {
  constructor({ metadata }) {
    super()

    this._id = createUUIDv4()
    this._nodes = []
    this._shared = metadata
  }

  add(newItem) {
    this._nodes = this._nodes.concat(newItem)
  }

  share(newSharedData) {
    this._shared = { ...this._shared, ...newSharedData }

    return this
  }

  async execute() {
    const debouncedOnUpdate = debounce(this.onUpdate.bind(this), 50)

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

  onUpdate() {
    this.dispatchEvent('update', this)
  }

  toJSON() {
    return {
      id: this._id
    }
  }
}

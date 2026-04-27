import { debounce } from '@src/helpers/utils.helpers'
import EventListener from '@src/templates/EventListener'

export class CommandList extends EventListener {
  constructor({ metadata }) {
    super()

    this._chain = []
    this._shared = metadata
  }

  add(newItem) {
    this._chain = this._chain.concat(newItem)
  }

  share(newSharedData) {
    this._shared = { ...this._shared, ...newSharedData }

    return this
  }

  async execute() {
    const debouncedOnUpdate = debounce(this.onUpdate.bind(this), 50)

    for (const command of this._chain) {
      command.share(this._shared)
      command.addEventListener('update', debouncedOnUpdate)

      await command.execute()

      command.removeEventListener('update', debouncedOnUpdate)
      if (command.failed) return
    }
  }

  onUpdate() {
    this.dispatchEvent('update', this)
  }
}

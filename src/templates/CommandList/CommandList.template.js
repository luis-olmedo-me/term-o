import EventListener from '@src/templates/EventListener'

export class CommandList extends EventListener {
  constructor(defaultShare) {
    super()

    this._chain = []
    this._shared = defaultShare
  }

  add(newItem) {
    this._chain = this._chain.concat(newItem)
  }

  share(newSharedData) {
    this._shared = { ...this._shared, ...newSharedData }

    return this
  }

  async execute() {
    for (const command of this._chain) {
      if (command.finished) return

      await command.execute()

      if (command.finished) return
    }
  }
}

import EventListener from '@src/templates/EventListener'

export class CommandChain extends EventListener {
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
}

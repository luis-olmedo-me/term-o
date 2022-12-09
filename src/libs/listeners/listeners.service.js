import { ignoredEventTypes } from './listeners.constants'

class Listeners {
  constructor() {
    this.data = []
  }

  getListeners() {
    return this.data
  }

  init() {
    const oldAddEventListeners = EventTarget.prototype.addEventListener
    const oldRemoveEventListeners = EventTarget.prototype.removeEventListener
    let self = this

    EventTarget.prototype.addEventListener = function(type, callback, options) {
      oldAddEventListeners.call(this, ...arguments)

      if (ignoredEventTypes.includes(type)) return

      self.data.push({ type, callback, options, context: this })
    }

    EventTarget.prototype.removeEventListener = function(type, callback) {
      oldRemoveEventListeners.call(this, ...arguments)

      self.data = self.data.filter(listener => {
        const matchType = type === listener.type
        const matchListener = callback === listener.callback

        return !matchType && !matchListener
      })
    }
  }
}

export const listeners = new Listeners()

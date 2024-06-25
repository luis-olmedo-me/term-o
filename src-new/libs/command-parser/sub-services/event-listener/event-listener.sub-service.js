export class EventListener {
  constructor() {
    this.listeners = {}
  }

  dispatchEvent(eventName, data = null) {
    const listeners = this.listeners[eventName] || []

    listeners.forEach(listener => listener(data))

    return this
  }

  addEventListener(eventName, listener) {
    const oldListeners = this.listeners[eventName] || []

    this.listeners = { ...this.listeners, [eventName]: [...oldListeners, listener] }

    return this
  }

  removeEventListener(eventName, listener) {
    const oldListeners = this.listeners[eventName] || []
    const filteredListeners = oldListeners.filter(oldListener => oldListener !== listener)
    const hasRemainingListeners = filteredListeners.length > 0

    if (!hasRemainingListeners) {
      delete this.listeners[eventName]
      return
    }

    this.listeners = { ...this.listeners, [eventName]: filteredEvents }

    return this
  }
}

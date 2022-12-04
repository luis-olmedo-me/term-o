;(function ListenListeners(context) {
  context._termo_listeners = []

  const oldAddEventListeners = EventTarget.prototype.addEventListener
  const oldRemoveEventListeners = EventTarget.prototype.removeEventListener

  EventTarget.prototype.addEventListener = function(type, callback, options) {
    oldAddEventListeners.call(this, ...arguments)

    context._termo_listeners.push({ type, callback, options, context: this })
  }

  EventTarget.prototype.removeEventListener = function(type, callback) {
    oldRemoveEventListeners.call(this, ...arguments)

    context._termo_listeners = context._termo_listeners.filter(listener => {
      const matchType = type === listener.type
      const matchListener = callback === listener.callback

      return !matchType && !matchListener
    })
  }
})(window)

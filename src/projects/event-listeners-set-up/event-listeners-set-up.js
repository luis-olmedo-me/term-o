;(function ListenListeners(context) {
  context.termo_listeners = []

  const oldAddEventListeners = EventTarget.prototype.addEventListener

  EventTarget.prototype.addEventListener = function(type, listener, options) {
    window.termo_listeners.push({ type, listener, options, context: this })

    oldAddEventListeners(...arguments)
  }
})(window)

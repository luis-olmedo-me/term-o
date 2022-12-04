EventTarget.prototype._getEventListeners = function(a) {
  if (!this.eventListenerList) this.eventListenerList = {}
  if (a == undefined) {
    return this.eventListenerList
  }
  return this.eventListenerList[a]
}

setTimeout(function() {
  function _showEvents(events) {
    for (let evt of Object.keys(events)) {
      console.log(evt + ' ----------------> ' + events[evt].length)
      for (let i = 0; i < events[evt].length; i++) {
        console.log(events[evt][i].listener.toString())
      }
    }
  }

  console.log('Window Events====================')
  const wevents = window._getEventListeners()
  _showEvents(wevents)
})

window.termo_test = 'testing'

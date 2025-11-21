export const humanClick = element => {
  const rect = element.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2

  const events = ['mouseover', 'mousemove', 'mousedown', 'mouseup', 'click']

  for (const type of events) {
    const evt = new MouseEvent(type, {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
      screenX: x,
      screenY: y
    })

    element.dispatchEvent(evt)
  }
}

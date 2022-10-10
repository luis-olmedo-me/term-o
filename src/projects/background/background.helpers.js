export const toggleTerminal = () => {
  const root = window.document.getElementById('term-o-root')

  if (!root) return

  const isInitiated = root.dataset.isInitiated === 'true'
  const isOpen = root.dataset.isOpen === 'true'

  if (isInitiated) {
    root.dataset.isOpen = !isOpen
  }
}

export const resizeRight = () => {
  const root = window.document.getElementById('term-o-root')

  if (!root) return

  const isInitiated = root.dataset.isInitiated === 'true'
  const isOpen = root.dataset.isOpen === 'true'

  if (isInitiated && isOpen) {
    const resizeEvent = new CustomEvent('term-o-resize', {
      detail: { side: 'right' }
    })

    dispatchEvent(resizeEvent)
  }
}
export const resizeLeft = () => {
  const root = window.document.getElementById('term-o-root')

  if (!root) return

  const isInitiated = root.dataset.isInitiated === 'true'
  const isOpen = root.dataset.isOpen === 'true'

  if (isInitiated && isOpen) {
    const resizeEvent = new CustomEvent('term-o-resize', {
      detail: { side: 'left' }
    })

    dispatchEvent(resizeEvent)
  }
}
export const resizeFull = () => {
  const root = window.document.getElementById('term-o-root')

  if (!root) return

  const isInitiated = root.dataset.isInitiated === 'true'
  const isOpen = root.dataset.isOpen === 'true'

  if (isInitiated && isOpen) {
    const resizeEvent = new CustomEvent('term-o-resize', {
      detail: { side: 'full' }
    })

    dispatchEvent(resizeEvent)
  }
}

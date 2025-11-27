import BubbleHtml from './term-bubble.raw.html'

import { delay } from '@src/helpers/utils.helpers'

class TermBubble extends HTMLElement {
  constructor() {
    super()
    this._shadow = this.attachShadow({ mode: 'closed' })
    this.isFinished = false

    this._shadow.innerHTML = BubbleHtml
  }

  get elements() {
    return {
      bubble: this._shadow.querySelector('#bubble'),
      message: this._shadow.querySelector('#message')
    }
  }

  connectedCallback() {
    this.elements.message.innerHTML = this.getAttribute('message')

    this.style.setProperty('--font', this.getAttribute('font'))
    this.style.setProperty('--white', this.getAttribute('white'))
    this.style.setProperty('--accent', this.getAttribute('accent'))
    this.style.setProperty('--foreground', this.getAttribute('foreground'))
    this.style.setProperty('--background', this.getAttribute('background'))

    this.addEventListener('click', this.closeDueToClick.bind(this))

    this._runAnimation()
  }

  async _runAnimation() {
    await delay(20)
    if (this.isFinished) return
    this.elements.bubble.classList.add('active')

    await delay(300)
    if (this.isFinished) return
    this.elements.bubble.classList.add('pulse')

    await delay(8700)
    if (this.isFinished) return
    this.elements.bubble.classList.remove('active')

    await delay(400)
    if (this.isFinished) return
    this.closeDueToTimeout()
  }

  closeDueToTimeout() {
    const autoClosedEvent = new CustomEvent('error', {
      detail: 'The bubble closed automatically because no action was taken in time.'
    })

    this.dispatchEvent(autoClosedEvent)
    this.remove()
  }

  async closeDueToClick() {
    this.isFinished = true
    this.elements.bubble.classList.remove('active')

    await delay(400)
    this.remove()
  }
}

if (!customElements.get('term-bubble')) {
  customElements.define('term-bubble', TermBubble)
}

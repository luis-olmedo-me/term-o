import { getPropsFromAttrs } from '@web-components/helpers/props.helpers'
import { bubblePropNames } from './term-bubble.constants'
import BubbleCss from './term-bubble.raw.css'
import BubbleHtml from './term-bubble.raw.html'

import { delay } from '@src/helpers/utils.helpers'

class TermBubble extends HTMLElement {
  constructor() {
    super()
    this._shadow = this.attachShadow({ mode: 'closed' })
    this.isFinished = false

    this._shadow.innerHTML = BubbleHtml
    this._elements.styles.innerHTML = BubbleCss
  }

  connectedCallback() {
    this._props = getPropsFromAttrs(this, bubblePropNames)
    this._elements.message.innerHTML = this._props.message

    this.style.setProperty('--font', this._props.font)
    this.style.setProperty('--white', this._props.white)
    this.style.setProperty('--accent', this._props.accent)
    this.style.setProperty('--foreground', this._props.foreground)
    this.style.setProperty('--background', this._props.background)

    this.addEventListener('click', this._closeDueToClick.bind(this))

    this._runAnimation()
  }

  get _elements() {
    return {
      bubble: this._shadow.querySelector('#bubble'),
      message: this._shadow.querySelector('#message'),
      styles: this._shadow.querySelector('#styles')
    }
  }

  async _runAnimation() {
    await delay(20)
    if (this.isFinished) return
    this._elements.bubble.classList.add('active')

    await delay(300)
    if (this.isFinished) return
    this._elements.bubble.classList.add('pulse')

    await delay(8700)
    if (this.isFinished) return
    this._elements.bubble.classList.remove('active')

    await delay(400)
    if (this.isFinished) return
    this._closeDueToTimeout()
  }

  _closeDueToTimeout() {
    const autoClosedEvent = new CustomEvent('error', {
      detail: 'The bubble closed automatically because no action was taken in time.'
    })

    this.dispatchEvent(autoClosedEvent)
    this.remove()
  }

  async _closeDueToClick() {
    this.isFinished = true
    this._elements.bubble.classList.remove('active')

    await delay(400)
    this.remove()
  }
}

if (!customElements.get('term-bubble')) {
  customElements.define('term-bubble', TermBubble)
}

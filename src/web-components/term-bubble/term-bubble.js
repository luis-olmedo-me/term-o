import BubbleHtml from './term-bubble.raw.html'

import { delay } from '@src/helpers/utils.helpers'

class TermBubble extends HTMLElement {
  constructor() {
    super()
    this._shadow = this.attachShadow({ mode: 'closed' })
    this.isFinished = false

    this._shadow.innerHTML = BubbleHtml
  }

  get bubble() {
    return this._shadow.querySelector('.bubble')
  }

  connectedCallback() {
    const msg = this.getAttribute('message')

    this.bubble.innerHTML = `
      ${this.getIcon()}
      <span>${msg}</span>
    `

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
    this.bubble.classList.add('active')

    await delay(300)
    if (this.isFinished) return
    this.bubble.classList.add('pulse')

    await delay(8700)
    if (this.isFinished) return
    this.bubble.classList.remove('active')

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
    this.bubble.classList.remove('active')

    await delay(400)
    this.remove()
  }

  getIcon() {
    return `
     <svg
        width="14" height="14" viewBox="0 0 512 512"
        fill="none" xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M140.87 123.172L189.355 171.861L279.199 81.5806L230.745 32.9088C224.847 27.0005 216.377 24 209 24C203.841 24 194.786 25.4229 187.44 32.816L140.778 79.62C133.417 87.0576 132 96.152 132 101.333C132 108.742 134.988 117.249 140.87 123.172Z"
          fill="var(--white)"
        />
        <path
          d="M187.425 479.184L140.778 432.32C133.417 424.942 132 415.848 132 410.667C132 403.258 134.988 394.751 140.87 388.828L149.502 380.16L239.351 470.445L230.745 479.091C224.847 484.999 216.377 488 209 488C203.841 488 194.786 486.577 187.425 479.184Z"
          fill="var(--white)"
        />
        <path
          d="M239.351 470.445L149.502 380.16L273.141 256L189.355 171.861L279.199 81.5806L431.037 234.099C436.581 239.683 440 247.462 440 256C440 264.599 436.381 272.487 431.006 277.901L239.351 470.445Z"
          fill="currentColor"
        />
      </svg>
    `
  }
}

if (!customElements.get('term-bubble')) {
  customElements.define('term-bubble', TermBubble)
}

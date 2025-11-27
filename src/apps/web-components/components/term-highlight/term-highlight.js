import HighlightCss from './term-highlight.raw.css'
import HighlightHtml from './term-highlight.raw.html'

import { delay } from '@src/helpers/utils.helpers'
import { getPropsFromAttrs } from '@web-components/helpers/props.helpers'
import { highlightPropNames } from './term-highlight.constants'

class TermHighlight extends HTMLElement {
  constructor() {
    super()

    this._shadow = this.attachShadow({ mode: 'closed' })
    this._shadow.innerHTML = HighlightHtml
    this._elements.styles.innerHTML = HighlightCss
  }

  get _elements() {
    return {
      overlay: this._shadow.querySelector('#overlay'),
      styles: this._shadow.querySelector('#styles')
    }
  }

  connectedCallback() {
    this._props = getPropsFromAttrs(this, highlightPropNames)
    const duration = Number(this._props.duration)

    this.style.setProperty('--color', this._props.color)
    this.style.setProperty('--radius', this._props.radius)

    this._runAnimation(duration)
  }

  async _runAnimation(duration) {
    await delay(20)
    this._elements.overlay.classList.add('active')

    await delay(400)
    this._elements.overlay.classList.remove('active')
    this._elements.overlay.classList.add('fade-out')

    await delay(duration)
    this.remove()
  }
}

if (!customElements.get('term-highlight')) {
  customElements.define('term-highlight', TermHighlight)
}

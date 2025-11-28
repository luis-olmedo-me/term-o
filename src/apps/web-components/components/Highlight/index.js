import HighlightCss from './Highlight.raw.css'
import HighlightHtml from './Highlight.raw.html'

import { webElements } from '@src/constants/web-elements.constants'
import { delay } from '@src/helpers/utils.helpers'
import { applyCssVariables, getPropsFromAttrs } from '@web-components/helpers/props.helpers'
import { highlightPropNames } from './Highlight.constants'

class Highlight extends HTMLElement {
  constructor() {
    super()

    this._shadow = this.attachShadow({ mode: 'closed' })
    this._shadow.innerHTML = HighlightHtml
  }

  get _elements() {
    return {
      overlay: this._shadow.querySelector('#overlay'),
      styles: this._shadow.querySelector('#styles')
    }
  }

  connectedCallback() {
    this._props = getPropsFromAttrs(this, highlightPropNames)
    this._elements.styles.innerHTML = applyCssVariables(HighlightCss, {
      color: this._props.color,
      radius: this._props.radius,
      left: this._props.left,
      top: this._props.top,
      width: this._props.width,
      height: this._props.height
    })

    this._runAnimation()
  }

  async _runAnimation() {
    await delay(20)
    this._elements.overlay.classList.add('active')

    await delay(400)
    this._elements.overlay.classList.remove('active')
    this._elements.overlay.classList.add('fade-out')

    await delay(700)
    this.remove()
  }
}

if (!customElements.get(webElements.HIGHLIGHT)) {
  customElements.define(webElements.HIGHLIGHT, Highlight)
}

import HighlightCss from './Highlight.raw.css?raw'
import HighlightHtml from './Highlight.raw.html?raw'

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

    if (this._props.isVisible === 'true') this._runAnimation()
    else this._runWithoutAnimation()
  }

  get _elements() {
    return {
      overlay: this._shadow.querySelector('#overlay'),
      styles: this._shadow.querySelector('#styles')
    }
  }

  async _runAnimation() {
    await delay(20)
    this._elements.overlay.classList.add('active')

    await delay(400)
    this._elements.overlay.classList.remove('active')
    this._elements.overlay.classList.add('fade-out')
    this._dispatch('fadingstart')

    await delay(700)
    this.remove()
  }

  async _runWithoutAnimation() {
    await delay(20)
    this._dispatch('fadingstart')

    await delay(100)
    this.remove()
  }

  _dispatch(name, detail = null) {
    const appearEvent = new CustomEvent(name, { detail })

    this.dispatchEvent(appearEvent)
  }
}

if (!customElements.get(webElements.HIGHLIGHT)) {
  customElements.define(webElements.HIGHLIGHT, Highlight)
}

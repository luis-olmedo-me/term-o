import rulerCss from './Ruler.raw.css?raw'
import rulerHtml from './Ruler.raw.html?raw'

import { webElements } from '@src/constants/web-elements.constants'
import { applyCssVariables, getPropsFromAttrs } from '@web-components/helpers/props.helpers'
import { rulerPropNames } from './Ruler.constants'

class Ruler extends HTMLElement {
  constructor() {
    super()

    this._shadow = this.attachShadow({ mode: 'closed' })
    this._shadow.innerHTML = rulerHtml
  }

  connectedCallback() {
    this._props = getPropsFromAttrs(this, rulerPropNames)
    this._elements.styles.innerHTML = applyCssVariables(rulerCss, {})
  }

  get _elements() {
    return {
      overlay: this._shadow.querySelector('.overlay'),
      styles: this._shadow.querySelector('.styles')
    }
  }

  _dispatch(name, detail = null) {
    const appearEvent = new CustomEvent(name, { detail })

    this.dispatchEvent(appearEvent)
  }
}

if (!customElements.get(webElements.RULER)) {
  customElements.define(webElements.RULER, Ruler)
}

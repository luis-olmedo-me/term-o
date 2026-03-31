import elementPickerCss from './ElementPicker.raw.css?raw'
import elementPickerHtml from './ElementPicker.raw.html?raw'

import { convertElementToJSON } from '@src/apps/content/helpers/format.helpers'
import { webElements } from '@src/constants/web-elements.constants'
import { applyCssVariables, getPropsFromAttrs } from '@web-components/helpers/props.helpers'
import { elementPickerPropNames } from './ElementPicker.constants'

class ElementPicker extends HTMLElement {
  constructor() {
    super()

    this._shadow = this.attachShadow({ mode: 'closed' })
    this._shadow.innerHTML = elementPickerHtml
  }

  connectedCallback() {
    this._props = getPropsFromAttrs(this, elementPickerPropNames)
    this._elements.styles.innerHTML = applyCssVariables(elementPickerCss, {})

    this._elements.overlay.addEventListener('click', this._handleOverlayClick)
  }

  get _elements() {
    return {
      overlay: this._shadow.querySelector('.overlay'),
      styles: this._shadow.querySelector('.styles')
    }
  }

  _handleOverlayClick(event) {
    const [, ...elements] = document.elementsFromPoint(event.clientX, event.clientY)
    const elementsAsJSON = elements.map(convertElementToJSON)

    console.log('💬 ~ elementsAsJSON:', elementsAsJSON)
    this._dispatch('pickedup', elements.at(0))
  }

  _dispatch(name, detail = null) {
    const appearEvent = new CustomEvent(name, { detail })

    this.dispatchEvent(appearEvent)
  }
}

if (!customElements.get(webElements.ELEMENT_PICKER)) {
  customElements.define(webElements.ELEMENT_PICKER, ElementPicker)
}

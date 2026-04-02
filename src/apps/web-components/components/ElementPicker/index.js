import WebElement from '@web-components/templates/WebElement'
import elementPickerCss from './ElementPicker.raw.css?raw'
import elementPickerHtml from './ElementPicker.raw.html?raw'

import { webElements } from '@src/constants/web-elements.constants'
import { stringifyFragments } from '@src/helpers/command.helpers'
import { convertElementToJSON } from '@src/helpers/converter.helpers'
import { formatElement } from '@src/helpers/format.helpers'

class ElementPicker extends WebElement {
  constructor() {
    super({ html: elementPickerHtml, css: elementPickerCss })
  }

  connectedCallback() {
    const overlayElement = this.$get('overlay')

    overlayElement.addEventListener('click', this._handleOverlayClick.bind(this))
  }

  _handleOverlayClick(event) {
    const thisRef = this
    const listElement = this.$get('list')
    const [, ...elements] = document.elementsFromPoint(event.clientX, event.clientY)

    listElement.replaceChildren()
    listElement.style.setProperty('top', `${event.clientY}px`)
    listElement.style.setProperty('left', `${event.clientX}px`)

    elements.forEach(element => {
      const elementAsJSON = convertElementToJSON(element)
      const elementAsLog = formatElement({ ...elementAsJSON, textContent: null, xpath: null })
      const elementAsTextLog = stringifyFragments(elementAsLog)

      const textElement = document.createElement('li')
      textElement.addEventListener('click', () => thisRef.$dispatch('pickedup', elementAsJSON))
      textElement.setAttribute('class', 'list-option')
      textElement.setAttribute('role', 'option')
      textElement.innerText = elementAsTextLog

      listElement.append(textElement)
    })
  }
}

if (!customElements.get(webElements.ELEMENT_PICKER)) {
  customElements.define(webElements.ELEMENT_PICKER, ElementPicker)
}

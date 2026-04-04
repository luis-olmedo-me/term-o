import WebElement from '@web-components/templates/WebElement'
import elementPickerCss from './ElementPicker.raw.css?raw'
import elementPickerHtml from './ElementPicker.raw.html?raw'

import { webElements } from '@src/constants/web-elements.constants'
import { stringifyFragments } from '@src/helpers/command.helpers'
import { convertElementToJSON } from '@src/helpers/converter.helpers'
import { formatElement } from '@src/helpers/format.helpers'
import { calculatePosition, createPaintedElement } from './ElementPicker.helpers'

class ElementPicker extends WebElement {
  constructor() {
    super({
      html: elementPickerHtml,
      css: elementPickerCss
    })

    this._isVisible = false
  }

  connectedCallback() {
    const overlayElement = this.$get('overlay')

    overlayElement.addEventListener('click', this._handleOverlayClick.bind(this))
    window.addEventListener('scroll', this._handleOverlayScroll.bind(this))
  }

  _handleOverlayClick(event) {
    const thisRef = this
    const listElement = this.$get('list')
    const pointElement = this.$get('point')
    const listContainerElement = this.$get('list-container')
    const [, ...elements] = document.elementsFromPoint(event.clientX, event.clientY)

    listElement.scrollTop = 0
    listElement.replaceChildren()
    listContainerElement.style.setProperty('scale', `1`)

    elements.forEach((element, index) => {
      const elementAsJSON = convertElementToJSON(element)
      const elementAsLog = formatElement({ ...elementAsJSON, textContent: null, xpath: null })
      const elementAsTextLog = stringifyFragments(elementAsLog)

      const coloredTextElement = createPaintedElement(elementAsTextLog)

      const textElement = document.createElement('li')
      textElement.addEventListener('click', () => thisRef.$dispatch('pickedup', elementAsJSON))
      textElement.setAttribute('class', 'list-option')
      textElement.setAttribute('role', 'option')
      textElement.setAttribute('style', `--index: ${index}`)

      textElement.append(coloredTextElement)
      listElement.append(textElement)
    })

    const [posX, posY] = calculatePosition(listContainerElement, event.clientX, event.clientY)

    this.$addStyles(listContainerElement, {
      top: `${posY}px`,
      left: `${posX}px`
    })

    this.$addStyles(pointElement, {
      top: `${event.clientY}px`,
      left: `${event.clientX}px`
    })

    this._isVisible = true
  }

  _handleOverlayScroll() {
    if (!this._isVisible) return

    const listContainerElement = this.$get('list-container')

    this.$removeStyles(listContainerElement, ['scale', 'top', 'left'])

    this._isVisible = false
  }
}

if (!customElements.get(webElements.ELEMENT_PICKER)) {
  customElements.define(webElements.ELEMENT_PICKER, ElementPicker)
}

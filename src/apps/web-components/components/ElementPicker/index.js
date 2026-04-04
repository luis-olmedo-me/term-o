import WebElement from '@web-components/templates/WebElement'
import elementPickerCss from './ElementPicker.raw.css?raw'
import elementPickerHtml from './ElementPicker.raw.html?raw'

import { getPaintedFragments } from '@src/components/ColoredText/ColoredText.helpers'
import { webElements } from '@src/constants/web-elements.constants'
import { stringifyFragments } from '@src/helpers/command.helpers'
import { convertElementToJSON } from '@src/helpers/converter.helpers'
import { formatElement } from '@src/helpers/format.helpers'
import { calculatePosition } from './ElementPicker.helpers'

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

    listElement.replaceChildren()
    listContainerElement.style.setProperty('scale', `1`)

    elements.forEach(element => {
      const elementAsJSON = convertElementToJSON(element)
      const elementAsLog = formatElement({ ...elementAsJSON, textContent: null, xpath: null })
      const elementAsTextLog = stringifyFragments(elementAsLog)

      const coloredTextElement = this._createPaintedElement(elementAsTextLog)

      const textElement = document.createElement('li')
      textElement.addEventListener('click', () => thisRef.$dispatch('pickedup', elementAsJSON))
      textElement.setAttribute('class', 'list-option')
      textElement.setAttribute('role', 'option')

      textElement.append(coloredTextElement)
      listElement.append(textElement)
    })

    const [posX, posY] = calculatePosition(listContainerElement, event.clientX, event.clientY)

    listContainerElement.style.setProperty('top', `${posY}px`)
    listContainerElement.style.setProperty('left', `${posX}px`)

    pointElement.style.setProperty('top', `${event.clientY}px`)
    pointElement.style.setProperty('left', `${event.clientX}px`)

    this._isVisible = true
  }

  _handleOverlayScroll() {
    if (!this._isVisible) return

    const listContainerElement = this.$get('list-container')

    listContainerElement.style.removeProperty('scale')
    listContainerElement.style.removeProperty('top')
    listContainerElement.style.removeProperty('left')

    this._isVisible = false
  }

  _createPaintedElement(text) {
    const lineElement = document.createElement('p')
    const fragments = getPaintedFragments(text)

    lineElement.setAttribute('class', 'line')
    for (const fragment of fragments) {
      const spanElement = document.createElement('span')
      spanElement.setAttribute('data-bgcolor', fragment.bgcolor)
      spanElement.setAttribute('data-color', fragment.color)
      spanElement.setAttribute('class', 'colored')

      spanElement.innerText = fragment.value
      lineElement.append(spanElement)
    }

    return lineElement
  }
}

if (!customElements.get(webElements.ELEMENT_PICKER)) {
  customElements.define(webElements.ELEMENT_PICKER, ElementPicker)
}

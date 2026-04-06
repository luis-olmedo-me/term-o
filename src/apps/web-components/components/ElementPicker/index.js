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
    this._isCanceled = false

    this._handleOverlayClickRef = this._handleOverlayClick.bind(this)
    this._handleOverlayScrollRef = this._handleOverlayScroll.bind(this)
    this._handleCancelationRef = this._handleCancelation.bind(this)
    this._handleKeyDownRef = this._handleKeyDown.bind(this)
  }

  connectedCallback() {
    const overlayElement = this.$get('overlay')

    overlayElement.addEventListener('click', this._handleOverlayClickRef)
    window.addEventListener('scroll', this._handleOverlayScrollRef)
    window.addEventListener('blur', this._handleCancelationRef)
    window.addEventListener('resize', this._handleCancelationRef)
    window.addEventListener('keydown', this._handleKeyDownRef)
  }

  _handleOverlayClick(event) {
    const thisRef = this
    const listElement = this.$get('list')
    const pointElement = this.$get('point')
    const imitationElement = this.$get('imitation')
    const listContainerElement = this.$get('list-container')
    const [, ...elements] = document.elementsFromPoint(event.clientX, event.clientY)

    listElement.scrollTop = 0
    listElement.replaceChildren()

    this.$addStyles(listContainerElement, {
      scale: 1
    })

    elements.forEach((element, index) => {
      const elementAsJSON = convertElementToJSON(element)
      const elementAsLog = formatElement({ ...elementAsJSON, textContent: null, xpath: null })
      const elementAsTextLog = stringifyFragments(elementAsLog)

      const coloredTextElement = createPaintedElement(elementAsTextLog)

      const textElement = document.createElement('li')
      textElement.addEventListener('click', () => thisRef.$dispatch('pickedup', elementAsJSON))
      textElement.addEventListener('mouseenter', () => thisRef._addImitationTo(element))
      textElement.setAttribute('class', 'list-option')
      textElement.setAttribute('role', 'option')
      textElement.setAttribute('style', `--index: ${index}`)

      textElement.append(coloredTextElement)
      listElement.append(textElement)
    })

    const [posX, posY] = calculatePosition(listContainerElement, event.clientX, event.clientY)
    const isPointAlreadyActive = pointElement.classList.contains('active')
    const isImitationAlreadyActive = imitationElement.classList.contains('active')

    this.$addStyles(listContainerElement, {
      top: `${posY}px`,
      left: `${posX}px`
    })

    this.$addStyles(pointElement, {
      top: `${event.clientY}px`,
      left: `${event.clientX}px`
    })

    if (!isPointAlreadyActive) pointElement.classList.add('active')
    if (isImitationAlreadyActive) imitationElement.classList.remove('active')

    this._isVisible = true
  }

  _handleOverlayScroll() {
    if (!this._isVisible) return

    const pointElement = this.$get('point')
    const imitationElement = this.$get('imitation')
    const listContainerElement = this.$get('list-container')
    const isImitationAlreadyActive = imitationElement.classList.contains('active')
    const isPointAlreadyActive = pointElement.classList.contains('active')

    if (isImitationAlreadyActive) imitationElement.classList.remove('active')
    if (isPointAlreadyActive) pointElement.classList.remove('active')
    this.$removeStyles(listContainerElement, ['scale', 'top', 'left'])
    this._isVisible = false
  }

  _addImitationTo(element) {
    const imitationElement = this.$get('imitation')
    const isImitationAlreadyActive = imitationElement.classList.contains('active')
    const rect = element.getBoundingClientRect()

    if (!isImitationAlreadyActive) imitationElement.classList.add('active')
    this.$addStyles(imitationElement, {
      top: `${rect.top}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`
    })
  }

  _handleCancelation() {
    if (this._isCanceled) return

    window.removeEventListener('scroll', this._handleOverlayScrollRef)
    window.removeEventListener('blur', this._handleCancelationRef)
    window.removeEventListener('resize', this._handleCancelationRef)
    window.removeEventListener('keydown', this._handleKeyDownRef)

    this.$dispatch('cancel')
    this.remove()

    this._isCanceled = true
  }

  _handleKeyDown(event) {
    if (event.key === 'Escape') this._handleCancelation()
  }
}

if (!customElements.get(webElements.ELEMENT_PICKER)) {
  customElements.define(webElements.ELEMENT_PICKER, ElementPicker)
}

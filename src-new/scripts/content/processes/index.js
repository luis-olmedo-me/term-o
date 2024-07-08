import { findDOMElement } from './dom/find-dom-element.process'
import { getDOMElements } from './dom/get-dom-elements.process'
import { getStorage } from './storage/get-storage.process'
import { getElementStyles } from './style/get-element-styles.process'

export default {
  'get-dom-elements': getDOMElements,
  'find-dom-element': findDOMElement,
  'get-storage': getStorage,
  'get-element-styles': getElementStyles
}

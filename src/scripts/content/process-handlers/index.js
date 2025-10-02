import { clickElement } from './dom/click-element.process'
import { findDOMElement } from './dom/find-dom-element.process'
import { getDOMElements } from './dom/get-dom-elements.process'
import { getStorage } from './storage/get-storage.process'
import { setStorage } from './storage/set-storage.process'
import { applyElementStyles } from './style/apply-element-styles.process'
import { getElementStyles } from './style/get-element-styles.process'

export default {
  'get-dom-elements': getDOMElements,
  'find-dom-element': findDOMElement,
  'get-storage': getStorage,
  'set-storage': setStorage,
  'get-element-styles': getElementStyles,
  'apply-element-styles': applyElementStyles,
  'click-element': clickElement
}

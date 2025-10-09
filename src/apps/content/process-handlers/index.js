import { applyElementStyles } from './apply-element-styles.process'
import { clickElement } from './click-element.process'
import { findDOMElement } from './find-dom-element.process'
import { getDOMElements } from './get-dom-elements.process'
import { getElementStyles } from './get-element-styles.process'
import { getStorage } from './get-storage.process'
import { setStorage } from './set-storage.process'

export default {
  'get-dom-elements': getDOMElements,
  'find-dom-element': findDOMElement,
  'get-storage': getStorage,
  'set-storage': setStorage,
  'get-element-styles': getElementStyles,
  'apply-element-styles': applyElementStyles,
  'click-element': clickElement
}

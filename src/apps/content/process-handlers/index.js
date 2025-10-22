import { processNames } from '@src/constants/process.constants'
import applyElementStyles from './apply-element-styles.process'
import clickElement from './click-element.process'
import executeCode from './execute-code.process'
import findDOMElement from './find-dom-element.process'
import getDOMElements from './get-dom-elements.process'
import getElementStyles from './get-element-styles.process'
import getStorage from './get-storage.process'
import setStorage from './set-storage.process'

export default {
  [processNames.GET_DOM_ELEMENTS]: getDOMElements,
  [processNames.EXECUTE_CODE]: executeCode,
  [processNames.FIND_DOM_ELEMENT]: findDOMElement,
  [processNames.GET_STORAGE]: getStorage,
  [processNames.SET_STORAGE]: setStorage,
  [processNames.GET_ELEMENT_STYLES]: getElementStyles,
  [processNames.APPLY_ELEMENT_STYLES]: applyElementStyles,
  [processNames.CLICK_ELEMENT]: clickElement
}

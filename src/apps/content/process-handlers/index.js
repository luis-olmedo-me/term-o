import applyElementStyles from './apply-element-styles.process'
import createElement from './create-element.process'
import createNotification from './create-notification.process'
import findDOMElement from './find-dom-element.process'
import getDOMElements from './get-dom-elements.process'
import getElementStyles from './get-element-styles.process'
import getStorage from './get-storage.process'
import injectHtml from './inject-html.process'
import measure from './measure.process'
import readVariable from './read-variable.process'
import requestElement from './request-element.process'
import setStorage from './set-storage.process'
import triggerEvent from './trigger-event.process'

import { processNames } from '@src/constants/process.constants'

export default {
  [processNames.APPLY_ELEMENT_STYLES]: applyElementStyles,
  [processNames.CREATE_ELEMENT]: createElement,
  [processNames.CREATE_NOTIFICATION]: createNotification,
  [processNames.FIND_DOM_ELEMENT]: findDOMElement,
  [processNames.GET_DOM_ELEMENTS]: getDOMElements,
  [processNames.GET_ELEMENT_STYLES]: getElementStyles,
  [processNames.GET_STORAGE]: getStorage,
  [processNames.INJECT_HTML]: injectHtml,
  [processNames.MEASURE]: measure,
  [processNames.READ_VARIABLE]: readVariable,
  [processNames.REQUEST_ELEMENT]: requestElement,
  [processNames.SET_STORAGE]: setStorage,
  [processNames.TRIGGER_EVENT]: triggerEvent
}

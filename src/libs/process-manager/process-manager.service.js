import { processNames } from '@src/constants/process.constants'
import { createWorkerProcessRequest } from './process-manager.helpers'

class ProcessManager {
  findDOMElement(
    tabId,
    { searchByXpath, searchBelow, siblingIndex, parentIndex, childIndex, appendXpath }
  ) {
    return createWorkerProcessRequest({
      type: processNames.FIND_DOM_ELEMENT,
      defaultResponse: null,
      tabId,
      data: { searchByXpath, searchBelow, siblingIndex, parentIndex, childIndex, appendXpath }
    })
  }

  getDOMElements(
    tabId,
    { searchBelow, searchByTag, searchByAttribute, searchByStyle, searchByText }
  ) {
    return createWorkerProcessRequest({
      type: processNames.GET_DOM_ELEMENTS,
      defaultResponse: [],
      tabId,
      data: { searchBelow, searchByTag, searchByAttribute, searchByStyle, searchByText }
    })
  }

  createElement(tabId, { tagName, below, attributes }) {
    return createWorkerProcessRequest({
      type: processNames.CREATE_ELEMENT,
      defaultResponse: null,
      tabId,
      data: { tagName, below, attributes }
    })
  }

  injectHTML(tabId, { below, html }) {
    return createWorkerProcessRequest({
      type: processNames.INJECT_HTML,
      defaultResponse: null,
      tabId,
      data: { below, html }
    })
  }

  getStorage(tabId, { includeLocal, includeSession, includeCookies }) {
    return createWorkerProcessRequest({
      type: processNames.GET_STORAGE,
      defaultResponse: {},
      tabId,
      data: { includeLocal, includeSession, includeCookies }
    })
  }

  setStorage(tabId, { namespace, key, value }) {
    return createWorkerProcessRequest({
      type: processNames.SET_STORAGE,
      defaultResponse: {},
      tabId,
      data: { namespace, key, value }
    })
  }

  getElementStyles(tabId, { searchByXpath, searchByProperty, theme }) {
    return createWorkerProcessRequest({
      type: processNames.GET_ELEMENT_STYLES,
      defaultResponse: [],
      tabId,
      data: { searchByXpath, searchByProperty, theme }
    })
  }

  applyElementStyles(tabId, { searchByXpath, styles, theme }) {
    return createWorkerProcessRequest({
      type: processNames.APPLY_ELEMENT_STYLES,
      defaultResponse: [],
      tabId,
      data: { searchByXpath, styles, theme }
    })
  }

  uploadFile({ extensions }) {
    return createWorkerProcessRequest({
      type: processNames.UPLOAD_FILE,
      defaultResponse: {},
      tabId: null,
      data: { extensions }
    })
  }

  pickColor() {
    return createWorkerProcessRequest({
      type: processNames.PICK_COLOR,
      defaultResponse: null,
      tabId: null,
      data: null
    })
  }

  requestInput() {
    return createWorkerProcessRequest({
      type: processNames.REQUEST_INPUT,
      defaultResponse: '',
      tabId: null,
      data: null
    })
  }

  requestElement(tabId, { theme }) {
    return createWorkerProcessRequest({
      type: processNames.REQUEST_ELEMENT,
      defaultResponse: '',
      tabId,
      data: { theme }
    })
  }

  measure(tabId, { start, end }) {
    return createWorkerProcessRequest({
      type: processNames.MEASURE,
      defaultResponse: '',
      tabId,
      data: { start, end }
    })
  }

  triggerEvent(tabId, { xpath, event, theme }) {
    return createWorkerProcessRequest({
      type: processNames.TRIGGER_EVENT,
      defaultResponse: null,
      tabId,
      data: { xpath, event, theme }
    })
  }

  readSelection(tabId) {
    return createWorkerProcessRequest({
      type: processNames.READ_SELECTION,
      defaultResponse: null,
      tabId,
      data: null
    })
  }

  createNotification(tabId, { title, message, theme, color }) {
    return createWorkerProcessRequest({
      type: processNames.CREATE_NOTIFICATION,
      defaultResponse: {},
      tabId,
      data: { title, message, theme, color }
    })
  }

  readPath(tabId, { path }) {
    return createWorkerProcessRequest({
      type: processNames.READ_VARIABLE,
      defaultResponse: '',
      tabId,
      data: { path }
    })
  }

  executeCode({ code, props, addonNames }) {
    return createWorkerProcessRequest({
      type: processNames.EXECUTE_CODE,
      defaultResponse: {},
      data: { code, props, addonNames }
    })
  }

  executeCommand({ line, origin }) {
    return createWorkerProcessRequest({
      type: processNames.EXECUTE_COMMAND,
      defaultResponse: null,
      data: { line, origin }
    })
  }

  getFontsAvailable() {
    return createWorkerProcessRequest({
      type: processNames.GET_FONTS_AVAILABLE,
      defaultResponse: [],
      data: null
    })
  }

  dispathTabEvent({ type }) {
    return createWorkerProcessRequest({
      type: processNames.DISPATCH_TAB_EVENT,
      defaultResponse: null,
      data: { type }
    })
  }
}

export const processManager = new ProcessManager()

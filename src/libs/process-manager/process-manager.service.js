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
    { searchBelow, searchByTag, searchByAttribute, searchByStyle, searchByText, appendTextContent, appendXpath }
  ) {
    return createWorkerProcessRequest({
      type: processNames.GET_DOM_ELEMENTS,
      defaultResponse: [],
      tabId,
      data: { searchBelow, searchByTag, searchByAttribute, searchByStyle, searchByText, appendTextContent, appendXpath }
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

  applyElementStyles(tabId, { searchByXpath, newInlineStyles, theme }) {
    return createWorkerProcessRequest({
      type: processNames.APPLY_ELEMENT_STYLES,
      defaultResponse: [],
      tabId,
      data: { searchByXpath, newInlineStyles, theme }
    })
  }

  uploadFile(tabId, { theme, extensions }) {
    return createWorkerProcessRequest({
      type: processNames.UPLOAD_FILE,
      defaultResponse: {},
      tabId,
      data: { theme, extensions }
    })
  }

  pickColor(tabId, { theme }) {
    return createWorkerProcessRequest({
      type: processNames.PICK_COLOR,
      defaultResponse: null,
      tabId,
      data: { theme }
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

  createNotification(tabId, { title, message, theme }) {
    return createWorkerProcessRequest({
      type: processNames.CREATE_NOTIFICATION,
      defaultResponse: {},
      tabId,
      data: { title, message, theme }
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

  executeCode({ code, props }) {
    return createWorkerProcessRequest({
      type: processNames.EXECUTE_CODE,
      defaultResponse: {},
      data: { code, props }
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
}

export const processManager = new ProcessManager()

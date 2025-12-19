import processHandlers from '@content/process-handlers'
import { setUpHandlers } from '@src/helpers/process.helpers'
import { importWebComponents } from '@src/helpers/web-components.helpers'

const contentHandler = setUpHandlers(processHandlers)

chrome.runtime.onMessage.addListener(contentHandler)
importWebComponents()

import { importWebComponents } from '@content/helpers/web-components.helpers'
import processHandlers from '@content/process-handlers'
import { setUpHandlers } from '@src/helpers/process.helpers'

const contentHandler = setUpHandlers(processHandlers)

chrome.runtime.onMessage.addListener(contentHandler)
importWebComponents()

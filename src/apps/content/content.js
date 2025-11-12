import { setUpHandlers } from '@src/helpers/process.helpers'
import processHandlers from './process-handlers'

const contentHandler = setUpHandlers(processHandlers)

chrome.runtime.onMessage.addListener(contentHandler)

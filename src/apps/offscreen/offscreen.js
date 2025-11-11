import { setUpHandlers } from '@src/helpers/process.helpers'
import processHandlers from './process-handlers'

const offscreenHandler = setUpHandlers(processHandlers)

chrome.runtime.onMessage.addListener(offscreenHandler)

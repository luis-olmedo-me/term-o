import { setUpHandlers } from '@src/helpers/process.helpers'
import processHandlers from './process-handlers'

const contentHandler = setUpHandlers(processHandlers)

chrome.runtime.onMessage.addListener(contentHandler)

const script = document.createElement('script')
script.src = chrome.runtime.getURL('assets/js/web-components.js')

document.documentElement.appendChild(script)
script.remove()

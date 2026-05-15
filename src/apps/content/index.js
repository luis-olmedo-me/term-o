import processHandlers from '@content/process-handlers'

import { importInjectables } from '@src/helpers/injectables.helpers'
import { registerTabEvents } from '@src/helpers/options.helpers'
import { setUpHandlers } from '@src/helpers/process.helpers'
import { importWebComponents } from '@src/helpers/web-components.helpers'

const contentHandler = setUpHandlers(processHandlers)

chrome.runtime.onMessage.addListener(contentHandler)

registerTabEvents()
importWebComponents()
importInjectables()

// document.addEventListener(
//   'selectionchange',
//   debounce(() => {
//     const selection = document.getSelection().toString()

//     if (!selection) return

//     processManager.dispathTabEvent({ type: tabEvents.SELECTION_CONTENT, params: null })
//   }, 100)
// )

// window.addEventListener('load', () => {
//   processManager.dispathTabEvent({ type: tabEvents.LOADED, params: null })
// })

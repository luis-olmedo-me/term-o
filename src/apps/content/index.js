import processHandlers from '@content/process-handlers'
import processManager from '@src/libs/process-manager'

import { tabEventCategory } from '@src/constants/options.constants'
import { importInjectables } from '@src/helpers/injectables.helpers'
import { getEventDefinition } from '@src/helpers/options.helpers'
import { setUpHandlers } from '@src/helpers/process.helpers'
import { importWebComponents } from '@src/helpers/web-components.helpers'

const contentHandler = setUpHandlers(processHandlers)

chrome.runtime.onMessage.addListener(contentHandler)
importWebComponents()
importInjectables()

const registerEvent = (below, event) => {
  below.addEventListener(event.type, () => {
    processManager.dispathTabEvent({ type: event.type, params: null })
  })
}

processManager.getEvents().then(events => {
  for (const event of events) {
    const definition = getEventDefinition(event)

    switch (definition.category) {
      case tabEventCategory.DOCUMENT:
        return registerEvent(window.document, event)

      case tabEventCategory.WINDOW:
        return registerEvent(window, event)
    }
  }
})

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

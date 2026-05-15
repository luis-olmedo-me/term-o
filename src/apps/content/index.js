import processHandlers from '@content/process-handlers'
import processManager from '@src/libs/process-manager'

import { tabEventCategory } from '@src/constants/options.constants'
import { getElementXPath } from '@src/helpers/dom-locator.helpers'
import { importInjectables } from '@src/helpers/injectables.helpers'
import { getEventDefinition } from '@src/helpers/options.helpers'
import { setUpHandlers } from '@src/helpers/process.helpers'
import { quotify } from '@src/helpers/string.helpers'
import { importWebComponents } from '@src/helpers/web-components.helpers'

const contentHandler = setUpHandlers(processHandlers)

chrome.runtime.onMessage.addListener(contentHandler)
importWebComponents()
importInjectables()

const registerEvent = (below, definition, event) => {
  const rawEventName = event.type
  const eventName = definition.getName(rawEventName)

  below.addEventListener(eventName, event => {
    const target = event.target
    const xpath = target ? getElementXPath(target) : ''
    const params = target ? [quotify(xpath)] : null

    processManager.dispathTabEvent({ type: rawEventName, params })
  })
}

processManager.getEvents().then(events => {
  for (const event of events) {
    const definition = getEventDefinition(event)

    if (!definition) continue

    switch (definition.category) {
      case tabEventCategory.DOCUMENT:
        return registerEvent(window.document, definition, event)

      case tabEventCategory.WINDOW:
        return registerEvent(window, definition, event)
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

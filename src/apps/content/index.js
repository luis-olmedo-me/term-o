import processHandlers from '@content/process-handlers'
import { availableEvents } from '@src/constants/events.constants'
import { importInjectables } from '@src/helpers/injectables.helpers'
import { setUpHandlers } from '@src/helpers/process.helpers'
import { importWebComponents } from '@src/helpers/web-components.helpers'
import processManager from '@src/libs/process-manager'

const contentHandler = setUpHandlers(processHandlers)

chrome.runtime.onMessage.addListener(contentHandler)
importWebComponents()
importInjectables()

document.addEventListener('selectionchange', () => {
  processManager.dispathTabEvent({
    type: availableEvents.TAB_SELECTION_CONTENT,
    content: document.getSelection().toString()
  })
})

processManager.dispathTabEvent({
  type: availableEvents.TAB_LOADED,
  content: null
})

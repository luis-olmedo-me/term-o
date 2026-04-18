import processHandlers from '@content/process-handlers'
import { tabEvents } from '@src/constants/events.constants'
import { importInjectables } from '@src/helpers/injectables.helpers'
import { setUpHandlers } from '@src/helpers/process.helpers'
import { debounce } from '@src/helpers/utils.helpers'
import { importWebComponents } from '@src/helpers/web-components.helpers'
import processManager from '@src/libs/process-manager'

const contentHandler = setUpHandlers(processHandlers)

chrome.runtime.onMessage.addListener(contentHandler)
importWebComponents()
importInjectables()

document.addEventListener(
  'selectionchange',
  debounce(() => {
    const selection = document.getSelection().toString()

    if (!selection) return

    processManager.dispathTabEvent({ type: tabEvents.SELECTION_CONTENT })
  }, 100)
)

window.addEventListener('load', () => {
  processManager.dispathTabEvent({ type: tabEvents.LOADED })
})

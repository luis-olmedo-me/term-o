import { extensionKeyEventNames, extensionKeyEvents, invalidPreURLs } from './background.constants'

console.log('Hello world from background!')

chrome.commands.onCommand.addListener(function(command) {
  if (!extensionKeyEventNames.includes(command)) return

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const [{ id, url }] = tabs
    const isInvalidUrl = invalidPreURLs.some(invalidUrl => url.startsWith(invalidUrl))

    if (isInvalidUrl) return

    if (command === extensionKeyEvents.TOGGLE_TERMINAL) {
      chrome.sidePanel
        .setPanelBehavior({ openPanelOnActionClick: true })
        .catch(error => console.error(error))
    }
  })
})

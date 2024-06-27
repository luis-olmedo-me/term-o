import { extensionKeyEventNames, extensionKeyEvents } from './background.constants'

console.log('Hello world from background!')

chrome.commands.onCommand.addListener(function(command) {
  if (!extensionKeyEventNames.includes(command)) return

  chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
    const [{ id }] = tabs

    if (command === extensionKeyEvents.OPEN_TERMINAL) {
      chrome.sidePanel.open({ tabId: id })
    }
  })
})

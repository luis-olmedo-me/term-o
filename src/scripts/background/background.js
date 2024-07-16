import { extensionKeyEventNames, extensionKeyEvents } from './background.constants'

let open = false

const closeSidePanel = async () => {
  await chrome.sidePanel.setOptions({ enabled: false })
  await chrome.sidePanel.setOptions({ enabled: true })
}

chrome.commands.onCommand.addListener(function(command) {
  if (!extensionKeyEventNames.includes(command)) return

  chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
    const [{ id }] = tabs

    if (command === extensionKeyEvents.OPEN_TERMINAL) {
      open = !open

      if (open) chrome.sidePanel.open({ tabId: id })
      else closeSidePanel()
    }
  })
})

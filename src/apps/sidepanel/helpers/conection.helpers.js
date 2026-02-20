export const connectToBackground = () => {
  const port = chrome.runtime.connect({ name: 'sidepanel' })

  port.onDisconnect.addListener(() => setTimeout(connectToBackground, 500))
}

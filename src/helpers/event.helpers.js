export const backgroundRequest = (eventType, callback) => {
  chrome.runtime.sendMessage({ type: eventType }, callback)
}

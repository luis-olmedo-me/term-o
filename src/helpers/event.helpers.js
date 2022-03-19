export const backgroundRequest = ({ eventType, callback = () => {}, data }) => {
  chrome.runtime.sendMessage({ type: eventType, data }, callback)
}

import processWaitList from '@src/libs/process-wait-list'
import processHandlers from './process-handlers'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { id, data } = request.data
  const handler = processHandlers[request.type]

  if (handler && !id) {
    processWaitList
      .add(resolve => handler(resolve, data))
      .then(() => sendResponse({ status: 'ok', data: processWaitList.getProcessById(id) }))
  }

  if (handler) return true
})

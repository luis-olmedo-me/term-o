import processWaitList from '@src/libs/process-wait-list'
import processHandlers from './process-handlers'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { id, data } = request.data
  const handler = processHandlers[request.type]

  const process = id
    ? processWaitList.getProcessById(id)
    : processWaitList.add(resolve => handler(resolve, data))

  return sendResponse({ status: 'ok', data: process })
})

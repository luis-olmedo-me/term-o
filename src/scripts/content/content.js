import processWaitList from '../../libs/process-wait-list'
import processes from './processes'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { id, data } = request.data
  const handler = processes[request.type]

  const process = id
    ? processWaitList.getProcessById(id)
    : processWaitList.add(resolve => handler(resolve, data))

  return sendResponse({ status: 'ok', data: process })
})

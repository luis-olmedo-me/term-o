import processWaitList from '@src/libs/process-wait-list'
import processes from './processes'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { id, data } = request.data
  const proccess = processes[request.type]

  if (proccess) {
    const process = id
      ? processWaitList.getProcessById(id)
      : processWaitList.add(resolve => proccess(resolve, data))

    return sendResponse({ status: 'ok', data: process })
  }
})

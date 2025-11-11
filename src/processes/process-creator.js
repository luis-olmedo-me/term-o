import { overwriteMessage } from '@src/helpers/messages.helpers'

const createWorkerRequest = ({ tabId, type, data, defaultResponse }) => {
  return new Promise((resolve, reject) => {
    const callback = response => {
      const lastError = chrome.runtime.lastError

      if (lastError) {
        const error = overwriteMessage(lastError.message)

        return reject(error)
      }

      if (response.status !== 'ok') return reject(response.error)

      resolve(response.data || defaultResponse)
    }

    if (tabId) chrome.tabs.sendMessage(tabId, { type, data }, callback)
    else chrome.runtime.sendMessage({ type, data }, callback)
  })
}
export const createWorkerProcessRequest = ({ tabId, type, data, defaultResponse }) => {
  return new Promise((resolve, reject) => {
    const callback = data => resolve(data || defaultResponse)

    const createWorker = data => {
      createWorkerRequest({ tabId, type, data, defaultResponse: {} }).then(callback).catch(reject)
    }

    createWorker({ id: null, data })
  })
}

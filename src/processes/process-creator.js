import { states } from '@src/libs/process-wait-list'
import { getErrorMessage } from './processes.helpers'

const createWorkerRequest = ({ tabId, type, data, defaultResponse }) => {
  return new Promise((resolve, reject) => {
    const callback = response => {
      const lastError = chrome.runtime.lastError

      if (lastError) {
        const error = getErrorMessage(lastError.message)

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
    const callback = process => {
      switch (process.state) {
        case states.IN_PROGRESS: {
          setTimeout(() => createWorker({ id: process.id, data }), 50)
          break
        }

        case states.ERROR: {
          reject(process.data || defaultResponse)
          break
        }

        case states.DONE: {
          resolve(process.data || defaultResponse)
          break
        }

        default: {
          reject('Unexpected status when waiting for process.')
          break
        }
      }
    }

    const createWorker = data => {
      createWorkerRequest({ tabId, type, data, defaultResponse: {} }).then(callback).catch(reject)
    }

    createWorker({ id: null, data })
  })
}

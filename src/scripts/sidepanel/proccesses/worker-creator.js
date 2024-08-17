import { states } from '@src/libs/process-wait-list'

const errorMessagesOverwritten = [
  {
    original: 'Could not establish connection. Receiving end does not exist.',
    new:
      'Term-o cannot establish a connection to the tab. Please refresh the page or ensure it is open. Note that Term-o cannot execute commands on extension or browser built-in pages.'
  }
]

const getErrorMessage = error => {
  const replacement = errorMessagesOverwritten.find(message => message.original === error)

  return replacement ? replacement.new : error
}

const createTabWorkerRequest = ({ tabId, type, data, defaultResponse }) => {
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

    chrome.tabs.sendMessage(tabId, { type, data }, callback)
  })
}

const createWorkerRequest = ({ type, data, defaultResponse }) => {
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

    chrome.runtime.sendMessage({ type, data }, callback)
  })
}

export const createWorkerProcessRequest = ({ type, data, defaultResponse }) => {
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
      createWorkerRequest({ type, data, defaultResponse: {} })
        .then(callback)
        .catch(reject)
    }

    createWorker({ id: null, data })
  })
}

export const createTabWorkerProcessRequest = ({ tabId, type, data, defaultResponse }) => {
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
      createTabWorkerRequest({ tabId, type, data, defaultResponse: {} })
        .then(callback)
        .catch(reject)
    }

    createWorker({ id: null, data })
  })
}

import { states } from '@src/libs/process-wait-list'

const createWorkerRequest = ({ tabId, type, data, defaultResponse }) => {
  return new Promise((resolve, reject) => {
    const callback = response => {
      if (response.status !== 'ok') return reject(response.error)

      resolve(response.data || defaultResponse)
    }

    chrome.tabs.sendMessage(tabId, { type, data }, callback)
  })
}

export const createWorkerProcessRequest = ({ tabId, type, data, defaultResponse }) => {
  return new Promise((resolve, reject) => {
    let timeoutId = null

    const callback = process => {
      switch (process.state) {
        case states.IN_PROGRESS: {
          timeoutId = setTimeout(() => createWorker({ id: process.id, data }), 100)
          break
        }

        case states.DONE: {
          resolve(process.data || defaultResponse)
          break
        }

        default: {
          reject()
          break
        }
      }
    }

    const createWorker = data => {
      createWorkerRequest({ tabId, type, data, defaultResponse: {} })
        .then(callback)
        .catch(reject)
    }

    createWorker({ id: null, data })
  })
}

export const getDOMElements = (tabId, data) => {
  return createWorkerProcessRequest({
    type: 'get-dom-elements',
    defaultResponse: {},
    tabId,
    data
  })
}

export const handleDOM = async command => {
  const { tab } = command.data
  const { get } = command.props

  command.update('Getting elements.')
  const elements = await getDOMElements(tab.id, { patterns: [get] })
  command.update('Finished.')

  command.reset()
  elements.forEach(element => command.update(element))
  command.update(`Found ${elements.length} elements.`)
}

import { eventTypes } from 'src/constants/events.constants.js'
import { states } from '../libs/process-wait-list/processWaitList.constants'

export const createWorkerRequest = ({ type, data, defaultResponse }) => {
  return new Promise((resolve, reject) => {
    const callback = (response) => {
      if (response?.status === 'ok') {
        resolve(response?.data || defaultResponse)
      } else {
        reject(response?.error)
      }
    }

    chrome?.runtime?.sendMessage?.({ type, data }, callback)
  })
}

export const createWorkerProcessRequest = ({ type, data, defaultResponse }) => {
  return new Promise((resolve, reject) => {
    let timeoutId = null
    const callback = (process) => {
      switch (process.state) {
        case states.IN_PROGRESS: {
          timeoutId = setTimeout(() => createWorker({ id: process.id }), 100)
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

    const createWorker = (data) => {
      createWorkerRequest({ type, data, defaultResponse: {} })
        .then(callback)
        .catch(reject)
    }

    createWorker({ id: null, data })
  })
}

export const fetchConfiguration = () => {
  return createWorkerRequest({
    type: eventTypes.GET_CONFIGURATION,
    defaultResponse: {}
  })
}

export const fetchHistorial = (data) => {
  return createWorkerProcessRequest({
    type: eventTypes.GET_HISTORIAL,
    defaultResponse: {},
    data
  })
}

export const deleteTabs = (data) => {
  return createWorkerProcessRequest({
    type: eventTypes.KILL_OPEN_TABS,
    data
  })
}

export const addAliases = (newAliases) => {
  return createWorkerRequest({
    type: eventTypes.ADD_ALIAS,
    data: newAliases
  })
}

export const deleteAliases = (aliasIds) => {
  return createWorkerRequest({
    type: eventTypes.DELETE_ALIAS,
    data: { aliasIdsToDelete: aliasIds }
  })
}

export const deletePageEvents = (ids) => {
  return createWorkerRequest({
    type: eventTypes.DELETE_PAGES_EVENT,
    data: { ids }
  })
}

export const addPageEvents = (newPageEvents) => {
  return createWorkerRequest({
    type: eventTypes.ADD_PAGES_EVENT,
    data: newPageEvents
  })
}

export const resetConfiguration = () => {
  return createWorkerRequest({
    type: eventTypes.RESET_CONFIGURATION
  })
}

export const fetchTabsOpen = (data) => {
  return createWorkerProcessRequest({
    type: eventTypes.GET_TABS_OPEN,
    defaultResponse: [],
    data
  })
}

export const updateConsolePosition = (position) => {
  return createWorkerRequest({
    type: eventTypes.UPDATE_CONFIG_CONSOLE_POSITION,
    data: position
  })
}

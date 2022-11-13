import { eventTypes } from 'src/constants/events.constants.js'
import { states } from '../libs/process-wait-list/processWaitList.constants'

const mergeAliases = (aliasesA, aliasesB) => {
  return aliasesB.reduce((aliases, aliasB) => {
    const isRepeated = aliases.some(entity => entity.name === aliasB.name)

    return isRepeated
      ? aliases.map(entity => (entity.name === aliasB.name ? aliasB : entity))
      : [...aliases, aliasB]
  }, aliasesA)
}

const receiveConfig = ({ aliases, pageEvents, position }) => ({
  consolePosition: position || {},
  pageEvents: pageEvents || [],
  aliases: aliases || []
})

export const createFrontWorkerRequest = ({ request }) => {
  return new Promise(async (resolve, reject) => {
    const response = await request().catch(() => reject({ status: 'error' }))

    resolve(response)
  })
}

export const createWorkerRequest = ({ type, data, defaultResponse }) => {
  return new Promise((resolve, reject) => {
    const callback = response => {
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
    const callback = process => {
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

    const createWorker = data => {
      createWorkerRequest({ type, data, defaultResponse: {} })
        .then(callback)
        .catch(reject)
    }

    createWorker({ id: null, data })
  })
}

export const fetchConfiguration = () => {
  return chrome.storage.local.get(['aliases', 'pageEvents', 'position']).then(receiveConfig)
}

export const addAliases = newAliases => {
  return new Promise(async (resolve, reject) => {
    const { aliases = [] } = await chrome.storage.local.get('aliases').catch(reject)
    const mergedAliases = mergeAliases(aliases, newAliases)

    await chrome.storage.local.set({ aliases: mergedAliases }).catch(reject)
    resolve()
  })
}

export const deleteAliases = async aliasIds => {
  return new Promise(async (resolve, reject) => {
    const { aliases = [] } = await chrome.storage.local.get('aliases').catch(reject)
    const filteredAliases = aliases.filter(({ id }) => !aliasIds.includes(id))

    await chrome.storage.local.set({ aliases: filteredAliases }).catch(reject)
    resolve()
  })
}

export const fetchHistorial = data => {
  return createWorkerProcessRequest({
    type: eventTypes.GET_HISTORIAL,
    defaultResponse: {},
    data
  })
}

export const closeTabs = data => {
  return createWorkerProcessRequest({
    type: eventTypes.CLOSE_OPEN_TABS,
    data
  })
}

export const deletePageEvents = ids => {
  return createWorkerRequest({
    type: eventTypes.DELETE_PAGES_EVENT,
    data: { ids }
  })
}

export const addPageEvents = newPageEvents => {
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

export const fetchTabsOpen = data => {
  return createWorkerProcessRequest({
    type: eventTypes.GET_TABS_OPEN,
    defaultResponse: [],
    data
  })
}

export const updateConsolePosition = position => {
  return createWorkerRequest({
    type: eventTypes.UPDATE_CONFIG_CONSOLE_POSITION,
    data: position
  })
}

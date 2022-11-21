import { eventTypes } from '@src/constants/events.constants.js'
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
  position: position || {},
  pageEvents: pageEvents || [],
  aliases: aliases || []
})

const createWorkerRequest = ({ type, data, defaultResponse }) => {
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
  return new Promise(async (resolve, reject) => {
    try {
      const response = await chrome.storage.local
        .get(['aliases', 'pageEvents', 'position'])
        .then(receiveConfig)
        .catch(reject)

      resolve(response)
    } catch {
      reject(new Error('contextError'))
    }
  })
}

export const addAliases = newAliases => {
  return new Promise(async (resolve, reject) => {
    try {
      const { aliases = [] } = await chrome.storage.local.get('aliases').catch(reject)
      const mergedAliases = mergeAliases(aliases, newAliases)

      await chrome.storage.local.set({ aliases: mergedAliases }).catch(reject)
      resolve()
    } catch {
      reject(new Error('contextError'))
    }
  })
}

export const deleteAliases = async aliasIds => {
  return new Promise(async (resolve, reject) => {
    try {
      const { aliases = [] } = await chrome.storage.local.get('aliases')
      const filteredAliases = aliases.filter(({ id }) => !aliasIds.includes(id))

      await chrome.storage.local.set({ aliases: filteredAliases })
      resolve()
    } catch {
      reject(new Error('contextError'))
    }
  })
}

export const addPageEvents = newPageEvents => {
  return new Promise(async (resolve, reject) => {
    try {
      const { pageEvents = [] } = await chrome.storage.local.get('pageEvents').catch(reject)
      const mergedPageEvents = [...pageEvents, ...newPageEvents]

      await chrome.storage.local.set({ pageEvents: mergedPageEvents }).catch(reject)
      resolve()
    } catch {
      reject(new Error('contextError'))
    }
  })
}

export const deletePageEvents = pageEventIds => {
  return new Promise(async (resolve, reject) => {
    try {
      const { pageEvents = [] } = await chrome.storage.local.get('pageEvents').catch(reject)
      const filteredPageEvents = pageEvents.filter(({ id }) => !pageEventIds.includes(id))

      await chrome.storage.local.set({ pageEvents: filteredPageEvents }).catch(reject)
      resolve()
    } catch {
      reject(new Error('contextError'))
    }
  })
}

export const resetConfiguration = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await chrome.storage.local.set({ aliases: [], pageEvents: [], position: {} }).catch(reject)
      resolve()
    } catch {
      reject(new Error('contextError'))
    }
  })
}

export const updateConsolePosition = position => {
  return new Promise(async (resolve, reject) => {
    try {
      await chrome.storage.local.set({ position }).catch(reject)
      resolve()
    } catch {
      reject(new Error('contextError'))
    }
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

export const fetchTabsOpen = data => {
  return createWorkerProcessRequest({
    type: eventTypes.GET_TABS_OPEN,
    defaultResponse: [],
    data
  })
}

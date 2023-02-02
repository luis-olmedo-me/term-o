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
const createFrontRequest = ({ request }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await request().catch(reject)

      resolve(response)
    } catch {
      reject(new Error('contextError'))
    }
  })
}

export const fetchConfiguration = () => {
  return createFrontRequest({
    request: async function() {
      return await chrome.storage.local
        .get(['aliases', 'pageEvents', 'position'])
        .then(receiveConfig)
    }
  })
}

export const addAliases = newAliases => {
  return createFrontRequest({
    request: async function() {
      const { aliases = [] } = await chrome.storage.local.get('aliases')
      const mergedAliases = mergeAliases(aliases, newAliases)

      await chrome.storage.local.set({ aliases: mergedAliases })
    }
  })
}

export const deleteAliases = async aliasIds => {
  return createFrontRequest({
    request: async function() {
      const { aliases = [] } = await chrome.storage.local.get('aliases')
      const filteredAliases = aliases.filter(({ id }) => !aliasIds.includes(id))

      await chrome.storage.local.set({ aliases: filteredAliases })
    }
  })
}

export const addPageEvents = newPageEvents => {
  return createFrontRequest({
    request: async function() {
      const { pageEvents = [] } = await chrome.storage.local.get('pageEvents')
      const mergedPageEvents = [...pageEvents, ...newPageEvents]

      await chrome.storage.local.set({ pageEvents: mergedPageEvents })
    }
  })
}

export const deletePageEvents = pageEventIds => {
  return createFrontRequest({
    request: async function() {
      const { pageEvents = [] } = await chrome.storage.local.get('pageEvents')
      const filteredPageEvents = pageEvents.filter(({ id }) => !pageEventIds.includes(id))

      await chrome.storage.local.set({ pageEvents: filteredPageEvents })
    }
  })
}

export const resetConfiguration = () => {
  return createFrontRequest({
    request: async function() {
      await chrome.storage.local.set({ aliases: [], pageEvents: [], position: {} })
    }
  })
}

export const updateConsolePosition = position => {
  return createFrontRequest({
    request: async function() {
      await chrome.storage.local.set({ position })
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

export const getTabsInfo = data => {
  return createWorkerProcessRequest({
    type: eventTypes.GET_TABS_INFO,
    defaultResponse: [],
    data
  })
}

export const updateTab = data => {
  return createWorkerProcessRequest({
    type: eventTypes.UPDATE_TAB,
    defaultResponse: null,
    data
  })
}

export const updateWindow = data => {
  return createWorkerProcessRequest({
    type: eventTypes.UPDATE_WINDOW,
    defaultResponse: null,
    data
  })
}

export const automaticallyCloseTabs = data => {
  return createWorkerRequest({
    type: eventTypes.AUTOMATIC_CLOSE_TABS,
    defaultResponse: null,
    data
  })
}

export const cancelAutomaticallyCloseTabs = data => {
  return createWorkerRequest({
    type: eventTypes.CANCEL_AUTOMATIC_CLOSE_TABS,
    defaultResponse: null,
    data
  })
}

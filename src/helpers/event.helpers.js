import { eventTypes } from 'src/constants/events.constants.js'

export const backgroundRequest = ({ eventType, callback = () => {}, data }) => {
  chrome.runtime.sendMessage({ type: eventType, data }, callback)
}

export const fetchConfiguration = () => {
  return new Promise((resolve, reject) => {
    const callback = (response) => {
      if (response?.status === 'ok') {
        resolve(response?.response || {})
      } else {
        reject(response?.error)
      }
    }

    backgroundRequest({ eventType: eventTypes.GET_CONFIGURATION, callback })
  })
}

export const addAliases = (newAliases) => {
  return new Promise((resolve, reject) => {
    const callback = (response) => {
      if (response?.status === 'ok') {
        resolve()
      } else {
        reject(response?.error)
      }
    }

    backgroundRequest({
      eventType: eventTypes.ADD_ALIAS,
      callback,
      data: newAliases
    })
  })
}

export const deleteAliases = (aliasIds) => {
  return new Promise((resolve, reject) => {
    const callback = (response) => {
      if (response?.status === 'ok') {
        resolve()
      } else {
        reject(response?.error)
      }
    }

    backgroundRequest({
      eventType: eventTypes.DELETE_ALIAS,
      callback,
      data: { aliasIdsToDelete: aliasIds }
    })
  })
}

export const deletePageEvents = (ids) => {
  return new Promise((resolve, reject) => {
    const callback = (response) => {
      if (response?.status === 'ok') {
        resolve()
      } else {
        reject(response?.error)
      }
    }

    backgroundRequest({
      eventType: eventTypes.DELETE_PAGES_EVENT,
      callback,
      data: { ids }
    })
  })
}

export const addPageEvents = (newPageEvents) => {
  return new Promise((resolve, reject) => {
    const callback = (response) => {
      if (response?.status === 'ok') {
        resolve()
      } else {
        reject(response?.error)
      }
    }

    backgroundRequest({
      eventType: eventTypes.ADD_PAGES_EVENT,
      callback,
      data: newPageEvents
    })
  })
}

export const resetConfiguration = () => {
  return new Promise((resolve, reject) => {
    const callback = (response) => {
      if (response?.status === 'ok') {
        resolve()
      } else {
        reject(response?.error)
      }
    }

    backgroundRequest({
      eventType: eventTypes.RESET_CONFIGURATION,
      callback
    })
  })
}

import { eventTypes } from 'src/constants/events.constants.js'

export const backgroundRequest = ({
  eventType,
  callback = () => {},
  data,
  errorCallback
}) => {
  try {
    chrome?.runtime?.sendMessage?.({ type: eventType, data }, callback)
  } catch (error) {
    errorCallback?.(error)
  }
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

    chrome?.runtime?.sendMessage?.(
      { type: eventTypes.GET_CONFIGURATION },
      callback
    )
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

    chrome?.runtime?.sendMessage?.(
      { type: eventTypes.ADD_ALIAS, data: newAliases },
      callback
    )
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

    chrome?.runtime?.sendMessage?.(
      { type: eventTypes.DELETE_ALIAS, data: { aliasIdsToDelete: aliasIds } },
      callback
    )
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

    chrome?.runtime?.sendMessage?.(
      { type: eventTypes.DELETE_PAGES_EVENT, data: { ids } },
      callback
    )
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

    chrome?.runtime?.sendMessage?.(
      { type: eventTypes.ADD_PAGES_EVENT, data: newPageEvents },
      callback
    )
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

    chrome?.runtime?.sendMessage?.(
      { type: eventTypes.RESET_CONFIGURATION, data: newPageEvents },
      callback
    )
  })
}

export const getTabsInfo = () => {
  return new Promise((resolve, reject) => {
    const callback = (response) => {
      if (response?.status === 'ok') {
        resolve(response.data)
      } else {
        reject(response?.error)
      }
    }

    chrome?.runtime?.sendMessage?.(
      { type: eventTypes.GET_TABS_INFO, data: newPageEvents },
      callback
    )
  })
}

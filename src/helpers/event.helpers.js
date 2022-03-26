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

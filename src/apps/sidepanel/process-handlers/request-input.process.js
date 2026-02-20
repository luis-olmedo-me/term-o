import { eventNames } from '@sidepanel/constants/events.constants'

export default async (resolve, reject) => {
  try {
    const requestEvent = new CustomEvent(eventNames.REQUEST_SEND)
    const handleRequestSolved = event => {
      window.removeEventListener(eventNames.REQUEST_SOLVED, handleRequestSolved)
      resolve(event.detail)
    }

    window.addEventListener(eventNames.REQUEST_SOLVED, handleRequestSolved)

    window.dispatchEvent(requestEvent)
  } catch (error) {
    reject('Unexpected error when trying to request input.')
  }
}

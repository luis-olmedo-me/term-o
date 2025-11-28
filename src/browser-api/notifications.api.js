import { createUUIDv4 } from '@src/helpers/utils.helpers'

export const createNotification = async ({ title, message, contextMessage }) => {
  const id = createUUIDv4()

  chrome.notifications.create(id, {
    type: 'basic',
    iconUrl: 'assets/images/logo-128_x_128.png',
    title: title,
    message: message,
    contextMessage: contextMessage
  })

  return id
}

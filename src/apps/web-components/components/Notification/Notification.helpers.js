import { webElements } from '@src/constants/web-elements.constants'

export const getLastNotificationElement = ({ currentId }) => {
  const notificationsRaw = Array.from(document.querySelectorAll(webElements.NOTIFICATION))
  const notifications = notificationsRaw.filter(element => currentId !== element.getAttribute('id'))

  return notifications.at(-1)
}

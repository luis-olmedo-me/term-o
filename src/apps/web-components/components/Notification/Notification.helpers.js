import { webElements } from '@src/constants/web-elements.constants'

export const getLastNotificationElement = ({ currentId }) => {
  const notificationsRaw = Array.from(document.querySelectorAll(webElements.NOTIFICATION))
  const notifications = notificationsRaw.filter(element => currentId !== element.getAttribute('id'))
  const lastNotification = notifications.at(-1)
  const lastTop = lastNotification?.getBoundingClientRect().bottom ?? 0

  return {
    lastNotification,
    top: lastTop + 12
  }
}

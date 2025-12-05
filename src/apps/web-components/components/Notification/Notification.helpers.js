import { webElements } from '@src/constants/web-elements.constants'

export const getLastNotificationElement = ({ currentId }) => {
  const query = document.querySelectorAll(`${webElements.NOTIFICATION}[index="0"]`)

  const notificationsRaw = Array.from(query)
  const notifications = notificationsRaw.filter(element => currentId !== element.getAttribute('id'))
  const lastNotification = notifications.at(-1)
  const lastTop = lastNotification?.getBoundingClientRect().bottom ?? 0

  return {
    lastNotification,
    top: lastTop + 12,
    index: notifications.length
  }
}

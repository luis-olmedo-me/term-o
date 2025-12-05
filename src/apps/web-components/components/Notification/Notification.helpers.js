import { webElements } from '@src/constants/web-elements.constants'

export const getNotificationBeforeElement = ({ currentId }) => {
  const query = document.querySelectorAll(webElements.NOTIFICATION)
  const queryAsArray = Array.from(query)
  const notifications = queryAsArray.filter(element => currentId !== element.getAttribute('id'))

  const notificationBefore = notifications.find(element => element.getAttribute('index') === '1')
  const lastTop = notificationBefore?.getBoundingClientRect().bottom ?? 0

  return {
    notificationBefore,
    top: lastTop + 12,
    index: notifications.length
  }
}

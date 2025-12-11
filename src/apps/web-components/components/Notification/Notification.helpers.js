import { webElements } from '@src/constants/web-elements.constants'

export const getNotificationBeforeElement = ({ currentId }) => {
  const query = document.querySelectorAll(webElements.NOTIFICATION)
  const queryAsArray = Array.from(query)
  const notifications = queryAsArray.filter(element => currentId !== element.getAttribute('id'))

  return notifications.find(element => element.getAttribute('index') === '1')
}

export const extendAllAnimations = ({ exeptionId }) => {
  const query = document.querySelectorAll(webElements.NOTIFICATION)
  const queryAsArray = Array.from(query)
  const notifications = queryAsArray.filter(element => exeptionId !== element.getAttribute('id'))

  notifications.forEach(element => element.extendAnimation())
}

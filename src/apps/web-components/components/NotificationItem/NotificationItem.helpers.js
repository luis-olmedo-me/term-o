import { getPaintedFragments } from '@src/components/ColoredText/ColoredText.helpers'
import { webElements } from '@src/constants/web-elements.constants'

export const getNotificationBeforeElement = ({ currentId }) => {
  const query = document.querySelectorAll(webElements.NOTIFICATION)
  const queryAsArray = Array.from(query)
  const notifications = queryAsArray.filter(element => currentId !== element.getAttribute('id'))

  return notifications.find(element => element.getAttribute('index') === '1')
}

export const buildHtmlTextContent = value => {
  const fragments = getPaintedFragments(value, false)

  return fragments.reduce((result, fragment) => {
    return `${result}<span data-bgcolor="${fragment.bgcolor}" data-color="${fragment.color}">${fragment.value}</span>`
  }, '')
}

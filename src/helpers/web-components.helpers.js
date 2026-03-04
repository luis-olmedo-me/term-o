import { isElementVisible } from '@src/apps/content/helpers/style-utils.helpers'
import { webElements } from '@src/constants/web-elements.constants'

export const importWebComponents = () => {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('assets/js/web-components.js')
  script.type = 'module'

  document.documentElement.appendChild(script)
  script.remove()
}

const createWebElement = (name, props = {}) => {
  const host = document.createElement(name)

  Object.entries(props).forEach(([propName, propValue]) => {
    host.setAttribute(propName, propValue)
  })

  document.body.appendChild(host)

  return host
}

export const createHighlight = ({ element, theme }) => {
  const rect = element.getBoundingClientRect()
  const radius = window.getComputedStyle(element).borderRadius
  const isVisible = isElementVisible(element)

  return createWebElement(webElements.HIGHLIGHT, {
    radius,
    isVisible,
    color: theme.colors.accent,
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`
  })
}

export const createNotification = ({ title, message, theme, duration }) => {
  const themeEvent = new CustomEvent('theme', { detail: theme })
  const element = createWebElement(webElements.NOTIFICATION, {
    title,
    message,
    duration
  })

  element.dispatchEvent(themeEvent)

  return element
}

export const createNotificationManager = ({ title, message, theme, duration }) => {
  const additionEvent = new CustomEvent('add', { detail: { title, message, duration } })
  let manager = window.document.querySelector(`${webElements.NOTIFICATION_MANAGER}#notifier`)

  if (!manager) {
    const themeEvent = new CustomEvent('theme', { detail: { theme } })
    manager = createWebElement(webElements.NOTIFICATION_MANAGER)

    manager.dispatchEvent(themeEvent)
  }

  manager.dispatchEvent(additionEvent)

  return manager
}

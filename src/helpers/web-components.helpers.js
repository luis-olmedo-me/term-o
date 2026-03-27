import { isElementVisible } from '@src/apps/content/helpers/style-utils.helpers'
import { webElements } from '@src/constants/web-elements.constants'

export const importWebComponents = () => {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('assets/js/web-components.js')
  script.type = 'module'

  document.documentElement.appendChild(script)
  script.remove()
}

export const createWebElement = (name, props = {}, below = document.body) => {
  const host = document.createElement(name)

  Object.entries(props).forEach(([propName, propValue]) => {
    host.setAttribute(propName, propValue)
  })

  below.appendChild(host)

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

export const createNotification = ({ title, message, theme, color }) => {
  const additionEvent = new CustomEvent('add', { detail: { title, message, color } })
  const themeEvent = new CustomEvent('theme', { detail: { theme } })
  let manager =
    window.document.querySelector(webElements.NOTIFICATION_MANAGER) ??
    createWebElement(webElements.NOTIFICATION_MANAGER)

  manager.dispatchEvent(themeEvent)
  manager.dispatchEvent(additionEvent)

  return manager
}

export const createRuler = () => {
  return createWebElement(webElements.RULER)
}

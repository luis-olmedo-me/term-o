import { isElementVisible } from '@src/apps/content/helpers/style-utils.helpers'
import { webElements } from '@src/constants/web-elements.constants'

export const importWebComponents = () => {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('assets/js/web-components.js')
  script.type = 'module'

  document.documentElement.appendChild(script)
  script.remove()
}

export const createWebElement = (
  name,
  { props = {}, theme = {}, root = null, below = document.body }
) => {
  const host = document.createElement(name)
  const propsEvent = new CustomEvent('propsloaded', { detail: { props } })
  const themeEvent = new CustomEvent('themechange', { detail: { theme } })
  const rootEvent = new CustomEvent('rootappend', { detail: { root } })

  below.appendChild(host)
  if (root) host.dispatchEvent(rootEvent)
  host.dispatchEvent(propsEvent)
  host.dispatchEvent(themeEvent)

  return host
}

export const createHighlight = ({ element, theme }) => {
  const rect = element.getBoundingClientRect()
  const borderRadius = window.getComputedStyle(element).borderRadius
  const isVisible = isElementVisible(element)

  return createWebElement(webElements.HIGHLIGHT, {
    theme,
    props: {
      borderRadius,
      isVisible,
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`
    }
  })
}

export const createNotification = ({ title, message, theme, color }) => {
  const additionEvent = new CustomEvent('add', { detail: { title, message, color } })

  let manager =
    window.document.querySelector(webElements.NOTIFICATION_MANAGER) ??
    createWebElement(webElements.NOTIFICATION_MANAGER, { theme })

  manager.dispatchEvent(additionEvent)

  return manager
}

export const createElementPicker = ({ theme }) => {
  return createWebElement(webElements.ELEMENT_PICKER, { theme })
}

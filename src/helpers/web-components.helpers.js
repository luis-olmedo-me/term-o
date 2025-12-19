import { webElements } from '@src/constants/web-elements.constants'

export const importWebComponents = () => {
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('assets/js/web-components.js')

  document.documentElement.appendChild(script)
  script.remove()
}

const createWebElement = (name, props) => {
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

  return createWebElement(webElements.HIGHLIGHT, {
    radius: radius,
    color: theme.colors.accent,
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`
  })
}

export const createBubble = ({ message, theme }) => {
  return createWebElement(webElements.BUBBLE, {
    message: message,
    font: theme.font,
    white: theme.colors.white,
    accent: theme.colors.accent,
    background: theme.colors.background,
    foreground: theme.colors.foreground
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

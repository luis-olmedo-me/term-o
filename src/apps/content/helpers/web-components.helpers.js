import { createWebElement } from '@content/pure-js'
import { webElements } from '@src/constants/web-elements.constants'

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

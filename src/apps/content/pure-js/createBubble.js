import { webElements } from '@src/constants/web-elements.constants'
import { createWebElement } from './createWebElement'

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

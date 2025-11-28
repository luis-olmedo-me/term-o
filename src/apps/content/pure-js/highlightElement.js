import { customColorThemeKeys } from '@src/constants/themes.constants'
import { webElements } from '@src/constants/web-elements.constants'
import { createWebElement } from './createWebElement'

export const highlightElement = (element, theme) => {
  const rect = element.getBoundingClientRect()
  const radius = window.getComputedStyle(element).borderRadius
  const color = theme.colors[customColorThemeKeys.ACCENT]

  return createWebElement(webElements.HIGHLIGHT, {
    color: color,
    radius: radius,
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`
  })
}

import { customColorThemeKeys } from '@src/constants/themes.constants'
import { webElements } from '@src/constants/web-elements.constants'

export const highlightElement = async (element, theme) => {
  const rect = element.getBoundingClientRect()
  const radius = window.getComputedStyle(element).borderRadius
  const color = theme.colors[customColorThemeKeys.ACCENT]

  const host = document.createElement(webElements.HIGHLIGHT)
  host.setAttribute('color', color)
  host.setAttribute('radius', radius)
  host.setAttribute('left', `${rect.left}px`)
  host.setAttribute('top', `${rect.top}px`)
  host.setAttribute('width', `${rect.width}px`)
  host.setAttribute('height', `${rect.height}px`)

  document.body.appendChild(host)
}

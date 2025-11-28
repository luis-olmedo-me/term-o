import { customColorThemeKeys } from '@src/constants/themes.constants'
import { delay } from '@src/helpers/utils.helpers'

export const highlightElement = async (element, theme, waitUntilComplete = false) => {
  const rect = element.getBoundingClientRect()
  const radius = window.getComputedStyle(element).borderRadius
  const color = theme.colors[customColorThemeKeys.ACCENT]

  const host = document.createElement('term-highlight')
  host.setAttribute('color', color)
  host.setAttribute('radius', radius)
  host.setAttribute('left', `${rect.left}px`)
  host.setAttribute('top', `${rect.top}px`)
  host.setAttribute('width', `${rect.width}px`)
  host.setAttribute('height', `${rect.height}px`)

  document.body.appendChild(host)

  if (waitUntilComplete) await delay(600)
}

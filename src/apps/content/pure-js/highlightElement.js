import { customColorThemeKeys } from '@src/constants/themes.constants'
import { delay } from '@src/helpers/utils.helpers'

export const highlightElement = async (element, theme, waitUntilComplete = false) => {
  const rect = element.getBoundingClientRect()
  const radius = window.getComputedStyle(element).borderRadius
  const color = theme.colors[customColorThemeKeys.ACCENT]

  const host = document.createElement('term-highlight')
  host.setAttribute('color', color)
  host.setAttribute('radius', radius)
  host.setAttribute('duration', '700')

  host.style.position = 'fixed'
  host.style.left = `${rect.left}px`
  host.style.top = `${rect.top}px`
  host.style.width = `${rect.width}px`
  host.style.height = `${rect.height}px`
  host.style.zIndex = 999999999
  host.style.pointerEvents = 'none'

  document.body.appendChild(host)

  if (waitUntilComplete) await delay(600)
}

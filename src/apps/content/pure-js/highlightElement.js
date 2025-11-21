import { customColorThemeKeys } from '@src/constants/themes.constants'
import { delay } from '@src/helpers/utils.helpers'

export const highlightElement = async (element, theme) => {
  const rect = element.getBoundingClientRect()
  const styles = window.getComputedStyle(element)

  const overlay = document.createElement('div')
  overlay.style.position = 'fixed'
  overlay.style.left = `${rect.left}px`
  overlay.style.top = `${rect.top}px`
  overlay.style.width = `${rect.width}px`
  overlay.style.height = `${rect.height}px`
  overlay.style.zIndex = 999999999
  overlay.style.pointerEvents = 'none'
  overlay.style.backgroundColor = 'transparent'
  overlay.style.border = '1px solid transparent'
  overlay.style.borderRadius = styles.borderRadius
  overlay.style.boxShadow = '0 0 0 transparent'
  overlay.style.opacity = '0'
  overlay.style.transition = `opacity .2s ease-in-out, transform .2s ease-in-out, box-shadow .2s ease-in-out, border-color .2s ease-in-out, background-color .2s ease-in-out`
  overlay.style.transform = 'scale(1.4)'

  document.body.appendChild(overlay)

  await delay(20)
  overlay.style.opacity = '1'
  overlay.style.backgroundColor = `${theme.colors[customColorThemeKeys.ACCENT]}`
  overlay.style.transform = 'scale(1)'
  overlay.style.boxShadow = `0 0 15px ${theme.colors[customColorThemeKeys.ACCENT]}`
  overlay.style.borderColor = theme.colors[customColorThemeKeys.ACCENT]

  await delay(400)
  overlay.style.transition = `opacity .3s ease-in-out, transform .5s ease-in-out, box-shadow .6s ease-in-out, border-color .5s ease-in-out, background-color .5s ease-in-out`
  overlay.style.boxShadow = `0 0 10px ${theme.colors[customColorThemeKeys.ACCENT]}`
  overlay.style.opacity = '0'
  overlay.style.transform = 'scale(1.3)'

  await delay(100)
  overlay.style.boxShadow = `0 0 0 ${theme.colors[customColorThemeKeys.ACCENT]}`
  overlay.style.borderColor = 'transparent'
  overlay.style.backgroundColor = 'transparent'

  await delay(700)
  overlay.remove()
}

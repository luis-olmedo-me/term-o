import { customColorThemeKeys } from '@src/constants/themes.constants'
import { delay } from '@src/helpers/utils.helpers'

const APPEAR_DELAY = 20
const PEAK_DURATION = 400
const TRANSITION_END_DELAY = 100
const REMOVE_DELAY = 700

export const highlightElement = async (element, theme) => {
  const rect = element.getBoundingClientRect()
  const styles = window.getComputedStyle(element)

  const overlay = document.createElement('div')
  const accent = theme.colors[customColorThemeKeys.ACCENT]

  Object.assign(overlay.style, {
    position: 'fixed',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    zIndex: 999999999,
    pointerEvents: 'none',

    backgroundColor: 'transparent',
    border: '1px solid transparent',
    borderRadius: styles.borderRadius,
    boxShadow: '0 0 0 transparent',
    opacity: '0',
    transform: 'scale(1.4)',
    transition:
      'opacity .2s ease-in-out, transform .2s ease-in-out, box-shadow .2s ease-in-out, border-color .2s ease-in-out, background-color .2s ease-in-out'
  })

  document.body.appendChild(overlay)

  await delay(APPEAR_DELAY)

  Object.assign(overlay.style, {
    opacity: '1',
    backgroundColor: accent,
    transform: 'scale(1)',
    boxShadow: `0 0 15px ${accent}`,
    borderColor: accent
  })

  await delay(PEAK_DURATION)

  overlay.style.transition =
    'opacity .3s ease-in-out, transform .5s ease-in-out, box-shadow .6s ease-in-out, border-color .5s ease-in-out, background-color .5s ease-in-out'

  Object.assign(overlay.style, {
    opacity: '0',
    transform: 'scale(1.3)',
    boxShadow: `0 0 10px ${accent}`
  })

  await delay(TRANSITION_END_DELAY)

  Object.assign(overlay.style, {
    boxShadow: `0 0 0 ${accent}`,
    borderColor: 'transparent',
    backgroundColor: 'transparent'
  })

  await delay(REMOVE_DELAY)
  overlay.remove()
}

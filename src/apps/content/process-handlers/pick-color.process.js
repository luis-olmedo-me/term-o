import { createOverlay } from '@content/helpers/dom-management.helpers'

export default async (resolve, data) => {
  if (!window.EyeDropper) {
    resolve({ color: null, error: 'EyeDropper API is not supported in this browser.' })
  }

  const overlay = createOverlay('Click anywhere to pick a color', data.theme, data.fontFamily)
  const startPicking = async () => {
    overlay.remove()

    try {
      const eyeDropper = new EyeDropper()
      const { sRGBHex } = await eyeDropper.open()

      resolve({ color: sRGBHex, error: null })
    } catch (error) {
      resolve({ color: null, error: 'Unexpected error when trying to pick-up color.' })
    } finally {
      document.removeEventListener('click', startPicking)
    }
  }

  overlay.appear()
  overlay.element.addEventListener('click', startPicking, { once: true })
}

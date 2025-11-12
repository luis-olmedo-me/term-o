import { createBubble } from '@content/helpers/dom-management.helpers'

export default async (resolve, reject, data) => {
  if (!window.EyeDropper) {
    resolve({ color: null, error: 'EyeDropper API is not supported in this browser.' })
  }

  const bubble = createBubble('Pick a color', data.theme, data.fontFamily)
  const startPicking = async () => {
    await bubble.remove()

    try {
      const eyeDropper = new EyeDropper()
      const { sRGBHex } = await eyeDropper.open()

      resolve(sRGBHex)
    } catch {
      reject('Unexpected error when trying to pick-up color.')
    } finally {
      document.removeEventListener('click', startPicking)
    }
  }

  bubble.element.addEventListener('click', startPicking, { once: true })
}

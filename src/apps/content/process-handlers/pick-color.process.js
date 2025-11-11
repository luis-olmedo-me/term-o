export default async resolve => {
  if (!window.EyeDropper) {
    resolve({ color: null, error: 'EyeDropper API is not supported in this browser.' })
  }

  const startPicking = async () => {
    overlay.remove()

    try {
      const eyeDropper = new EyeDropper()
      const { sRGBHex } = await eyeDropper.open()

      resolve({ color: sRGBHex, error: null })
    } catch (error) {
      resolve({ color: null, error: 'Unexpected error when trying to pick-up color.' })
    } finally {
      document.body.style.cursor = ''
      document.removeEventListener('click', startPicking)
    }
  }

  const overlay = document.createElement('div')
  overlay.style.position = 'fixed'
  overlay.style.inset = '0'
  overlay.style.background = 'rgba(0,0,0,0.7)'
  overlay.style.cursor = 'crosshair'
  overlay.style.zIndex = '999999'
  overlay.style.display = 'flex'
  overlay.style.alignItems = 'center'
  overlay.style.justifyContent = 'center'
  overlay.style.color = '#fff'
  overlay.style.fontSize = '18px'
  overlay.textContent = 'Click anywhere to pick a color'
  document.body.appendChild(overlay)

  document.body.style.cursor = 'crosshair'
  document.addEventListener('click', startPicking, { once: true })
}

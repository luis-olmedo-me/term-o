export default async resolve => {
  if (!window.EyeDropper) {
    resolve({ color: null, error: 'EyeDropper API is not supported in this browser.' })
  }

  const eyeDropper = new EyeDropper()
  const { sRGBHex } = await eyeDropper.open()

  resolve({ color: sRGBHex, error: null })
}

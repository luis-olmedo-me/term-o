export default async (resolve, reject) => {
  if (!window.EyeDropper) return reject('EyeDropper API is not supported in this browser.')

  try {
    const eyeDropper = new EyeDropper()
    const { sRGBHex } = await eyeDropper.open()

    resolve(sRGBHex)
  } catch {
    reject(
      'An unexpected error occurred while trying to pick a color. Please make sure the terminal is open before attempting to pick a color.'
    )
  }
}

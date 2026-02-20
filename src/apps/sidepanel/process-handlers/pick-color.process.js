export default async (resolve, reject) => {
  if (!window.EyeDropper) return reject('EyeDropper API is not supported in this browser.')

  try {
    const eyeDropper = new EyeDropper()
    const { sRGBHex } = await eyeDropper.open()

    resolve(sRGBHex)
  } catch {
    reject('Unexpected error when trying to pick-up color.')
  }
}

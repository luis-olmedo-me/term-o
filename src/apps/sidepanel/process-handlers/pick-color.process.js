export default async (resolve, reject, data) => {
  console.log('💬 ~ data:', data)
  if (!window.EyeDropper) return reject('EyeDropper API is not supported in this browser.')

  // const notification = createNotification({
  //   title: 'Term-O | Action required to proceed',
  //   message: 'Click to start picking a color',
  //   theme: data.theme,
  //   duration: durations.EXTENDED
  // })

  // const startPicking = async () => {
  //   try {
  //     const eyeDropper = new EyeDropper()
  //     const { sRGBHex } = await eyeDropper.open()

  //     resolve(sRGBHex)
  //   } catch {
  //     reject('Unexpected error when trying to pick-up color.')
  //   } finally {
  //     document.removeEventListener('click', startPicking)
  //   }
  // }

  // notification.addEventListener('click', startPicking)
  // notification.addEventListener('timeout', event => reject(event.detail))

  resolve('#111111')
}

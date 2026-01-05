export default async (resolve, reject, data) => {
  const handleMessage = event => {
    if (event.data?.source !== 'MY_EXTENSION') return
    if (!event.data?.type.endsWith('_RESPONSE')) return
    window.removeEventListener('message', handleMessage)

    if (event.data.response.error) reject(event.data.response.error)
    else resolve(event.data.response.value)
  }

  window.addEventListener('message', handleMessage, false)

  window.postMessage(
    {
      source: 'MY_EXTENSION',
      type: 'READ_VARIABLE',
      data: { path: data.path }
    },
    '*'
  )
}

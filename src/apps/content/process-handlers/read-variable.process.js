import {
  injectableStates,
  injectableTypes,
  TERMO_SOURCE
} from '@src/constants/injectales.constants'

export default async (resolve, reject, data) => {
  const handleMessage = event => {
    if (event.data?.source !== TERMO_SOURCE) return
    if (event.data?.state !== injectableStates.SOLVED) return

    window.removeEventListener('message', handleMessage)

    if (event.data.response.error) reject(event.data.response.error)
    else resolve(event.data.response.value)
  }

  window.addEventListener('message', handleMessage, false)

  window.postMessage(
    {
      source: TERMO_SOURCE,
      state: injectableStates.REGISTERED,
      type: injectableTypes.READ_VARIABLE,
      data: { path: data.path }
    },
    '*'
  )
}

import {
  injectableStates,
  injectableTypes,
  TERMO_SOURCE
} from '@src/constants/injectales.constants'
import { createUUIDv4 } from '@src/helpers/utils.helpers'

export default async (resolve, reject, data) => {
  const id = createUUIDv4()
  const handleMessage = event => {
    if (event.data?.source !== TERMO_SOURCE) return
    if (event.data?.state !== injectableStates.SOLVED) return
    if (event.data?.id !== id) return

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
      data: { path: data.path },
      id
    },
    '*'
  )
}

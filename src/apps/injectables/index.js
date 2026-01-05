import {
  injectableStates,
  injectableTypes,
  TERMO_SOURCE
} from '@src/constants/injectales.constants'
import readVariableHandler from './handlers/read-variable.handler'

window.addEventListener('message', async event => {
  if (event.data?.source !== TERMO_SOURCE) return
  if (event.data?.state !== injectableStates.REGISTERED) return
  const type = event.data?.type
  const isExpectedType = Object.values(injectableTypes).includes(type)

  if (!isExpectedType) return
  let response

  if (type === injectableTypes.READ_VARIABLE) response = await readVariableHandler(event)

  event.source.postMessage(
    {
      source: TERMO_SOURCE,
      state: injectableStates.SOLVED,
      type,
      response
    },
    '*'
  )
})

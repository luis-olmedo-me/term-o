import readVariableHandler from './handlers/read-variable.handler'

window.addEventListener('message', async event => {
  if (event.data?.source !== 'MY_EXTENSION') return
  if (event.data?.type !== 'READ_VARIABLE') return
  let response

  if (event.data.type === 'READ_VARIABLE') response = await readVariableHandler(event)

  event.source.postMessage(
    {
      source: event.data.source,
      type: `${event.data.type}_RESPONSE`,
      response
    },
    '*'
  )
})

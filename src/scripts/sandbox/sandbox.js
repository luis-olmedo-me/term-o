async function safeEval(event) {
  const code = event.data.data.code

  const storage = props => {
    return new Promise(resolve => {
      const handleSandboxCommand = event => {
        if (event.data?.type !== 'sandbox-command-return') return

        window.removeEventListener('message', handleSandboxCommand)
        resolve(event.data.data.updates)
      }

      window.addEventListener('message', handleSandboxCommand)

      event.source.window.postMessage(
        { type: 'sandbox-command', data: { props, name: 'storage' } },
        event.origin
      )
    })
  }

  const update = (...args) => {
    event.source.window.postMessage(
      { type: 'sandbox-command-update', data: { updates: args } },
      event.origin
    )
  }

  const restrictedEval = new Function(
    'update',
    'storage',
    `
      "use strict";
      return (function() {
        try {
          ${code}
  
          return main
        } catch(error) {
          update(error)
        }
      })();
    `
  )

  try {
    return await restrictedEval(update, storage)?.()
  } catch (error) {
    return `Error: ${error.message}`
  }
}

window.addEventListener('message', async function(event) {
  if (event.data?.type !== 'sandbox-code') return

  await safeEval(event)
  event.source.window.postMessage({ type: 'sandbox-command-finish' }, event.origin)
})

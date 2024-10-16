const safeEval = event => {
  const code = event.data.code
  const storage = props => {
    return new Promise(resolve => {
      const handleSandboxCommand = event => {
        if (event.data?.type !== 'sandbox-command-return') return

        resolve(event.data.updates)
      }

      event.source.window.postMessage(
        { type: 'sandbox-command', data: { props, name: 'storage' } },
        event.origin
      )

      window.addEventListener('message', handleSandboxCommand)
    })
  }

  const restrictedEval = new Function(
    'storage',
    `
        "use strict";
        return (function() {
            ${code}
            main();
        })();
    `
  )

  try {
    return restrictedEval(storage)
  } catch (error) {
    return `Error: ${error.message}`
  }
}

window.addEventListener('message', async function(event) {
  if (event.data?.type !== 'sandbox-code') return

  event.source.window.postMessage(safeEval(event), event.origin)
})

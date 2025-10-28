import { commandNames } from '@src/constants/command.constants'

async function safeEval(event) {
  const code = event.data.data.code

  const createHandlerFor = name => props => {
    return new Promise((resolve, reject) => {
      const handleSandboxCommand = event => {
        if (event.data?.type !== 'sandbox-command-return') return
        const data = event.data.data
        const errorMessage = data.updates.at(0)

        window.removeEventListener('message', handleSandboxCommand)
        if (!data.hasError) resolve(data.updates)
        else reject(errorMessage)
      }

      window.addEventListener('message', handleSandboxCommand)

      event.source.window.postMessage(
        { type: 'sandbox-command', data: { props, name } },
        event.origin
      )
    })
  }

  const update = (...args) => {
    return new Promise((resolve, reject) => {
      const handleSandboxCommand = event => {
        if (event.data?.type !== 'sandbox-command-update-return') return
        const data = event.data.data
        const errorMessage = data.updates.at(0)

        window.removeEventListener('message', handleSandboxCommand)
        if (!data.hasError) resolve(data.updates)
        else reject(errorMessage)
      }

      window.addEventListener('message', handleSandboxCommand)

      event.source.window.postMessage(
        { type: 'sandbox-command-update', data: { updates: args } },
        event.origin
      )
    })
  }

  const setUpdates = (...args) => {
    return new Promise((resolve, reject) => {
      const handleSandboxCommand = event => {
        if (event.data?.type !== 'sandbox-command-set-updates-return') return
        const data = event.data.data
        const errorMessage = data.updates.at(0)

        window.removeEventListener('message', handleSandboxCommand)
        if (!data.hasError) resolve(data.updates)
        else reject(errorMessage)
      }

      window.addEventListener('message', handleSandboxCommand)

      event.source.window.postMessage(
        { type: 'sandbox-command-set-updates', data: { updates: args } },
        event.origin
      )
    })
  }

  const handledCommandNames = Object.values(commandNames)
  const handlers = handledCommandNames.map(createHandlerFor)

  const restrictedEval = new Function(
    ...handledCommandNames,
    'update',
    'setUpdates',
    `
      "use strict";
      return (function() {
        try {
          ${code}
  
          return main || null
        } catch(error) {
          setUpdates(error)
        }
      })();
    `
  )

  try {
    const main = await restrictedEval(...handlers, update, setUpdates)
    const isFunction = typeof main === 'function'
    const matchesWithName = main?.name === 'main'

    if (!isFunction || !matchesWithName) throw 'Executed script must use a function called "main".'
    await main([])

    return ''
  } catch (error) {
    await setUpdates(`${error}`)
    return `${error}`
  }
}

window.addEventListener('message', async function (event) {
  if (event.data?.type !== 'sandbox-code') return

  const error = await safeEval(event)
  event.source.window.postMessage({ type: 'sandbox-command-finish', data: { error } }, event.origin)
})

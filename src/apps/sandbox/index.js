import { commandNames } from '@src/constants/command.constants'
import { sandboxEvents } from '@src/constants/sandbox.constants'

async function safeEval(event) {
  const code = event.data.data.code
  const props = event.data.data.props

  const createHandlerFor = name => commandProps => {
    return new Promise((resolve, reject) => {
      const handleSandboxCommand = event => {
        if (event.data?.type !== sandboxEvents.COMMAND_RETURN) return
        const data = event.data.data
        const errorMessage = data.updates.at(0)

        window.removeEventListener('message', handleSandboxCommand)
        if (!data.hasError) resolve(data.updates)
        else reject(errorMessage)
      }

      window.addEventListener('message', handleSandboxCommand)

      event.source.window.postMessage(
        { type: sandboxEvents.COMMAND, data: { props: commandProps, name } },
        event.origin
      )
    })
  }

  const update = (...args) => {
    return new Promise((resolve, reject) => {
      const handleSandboxCommand = event => {
        if (event.data?.type !== sandboxEvents.COMMAND_UPDATE_RETURN) return
        const data = event.data.data
        const errorMessage = data.updates.at(0)

        window.removeEventListener('message', handleSandboxCommand)
        if (!data.hasError) resolve(data.updates)
        else reject(errorMessage)
      }

      window.addEventListener('message', handleSandboxCommand)

      event.source.window.postMessage(
        { type: sandboxEvents.COMMAND_UPDATE, data: { updates: args } },
        event.origin
      )
    })
  }

  const setUpdates = (...args) => {
    return new Promise((resolve, reject) => {
      const handleSandboxCommand = event => {
        if (event.data?.type !== sandboxEvents.COMMAND_SET_UPDATES_RETURN) return
        const data = event.data.data
        const errorMessage = data.updates.at(0)

        window.removeEventListener('message', handleSandboxCommand)
        if (!data.hasError) resolve(data.updates)
        else reject(errorMessage)
      }

      window.addEventListener('message', handleSandboxCommand)

      event.source.window.postMessage(
        { type: sandboxEvents.COMMAND_SET_UPDATES, data: { updates: args } },
        event.origin
      )
    })
  }

  const handledCommandNames = Object.values(commandNames)
  const handlersEntries = handledCommandNames.map(name => [name, createHandlerFor(name)])
  const commands = Object.fromEntries(handlersEntries)
  const get = propName => props[propName]

  const term = {
    get,
    update,
    setUpdates,
    commands
  }

  const restrictedEval = new Function(
    'term',
    `
      return (async () => {
        ${code}
        if (typeof main !== 'function') {
          throw new Error('Script must define a function called "main"')
        }
        return main
      })()
    `
  )

  try {
    const userMain = await restrictedEval(term)

    const result = userMain(term)
    await Promise.resolve(result)

    return ''
  } catch (error) {
    const message = String(error?.message ?? error)

    await setUpdates(message)
    return message
  }
}

window.addEventListener('message', async event => {
  if (event.data?.type !== sandboxEvents.CODE) return
  const error = await safeEval(event)

  event.source.window.postMessage(
    { type: sandboxEvents.COMMAND_FINISH, data: { error } },
    event.origin
  )
})

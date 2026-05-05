import { commandNames } from '@src/constants/command.constants'
import { sandboxEvents } from '@src/constants/sandbox.constants'
import { sanitizeLogs } from '@src/helpers/command.helpers'

async function safeEval(event) {
  const code = event.data.data.code
  const props = event.data.data.props
  const addonNames = event.data.data.addonNames

  const createHandlerFor = name => commandProps => {
    return new Promise((resolve, reject) => {
      const handleSandboxCommand = event => {
        if (event.data?.type !== sandboxEvents.COMMAND_RETURN) return
        const data = event.data.data

        window.removeEventListener('message', handleSandboxCommand)
        if (!data.hasError) resolve(data.logs)
        else reject(data.errors)
      }

      window.addEventListener('message', handleSandboxCommand)

      event.source.window.postMessage(
        { type: sandboxEvents.COMMAND, data: { props: commandProps, name } },
        event.origin
      )
    })
  }

  const log = (...args) => {
    return new Promise((resolve, reject) => {
      const sanitizedArgs = sanitizeLogs(args)
      const handleSandboxCommand = event => {
        if (event.data?.type !== sandboxEvents.COMMAND_LOG_RETURN) return
        const data = event.data.data

        window.removeEventListener('message', handleSandboxCommand)
        if (!data.hasError) resolve(data.logs)
        else reject(data.errors)
      }

      window.addEventListener('message', handleSandboxCommand)

      event.source.window.postMessage(
        { type: sandboxEvents.COMMAND_LOG, data: { logs: [sanitizedArgs] } },
        event.origin
      )
    })
  }

  const clear = () => {
    return new Promise((resolve, reject) => {
      const handleSandboxCommand = event => {
        if (event.data?.type !== sandboxEvents.COMMAND_CLEAR_LOGS_RETURN) return
        const data = event.data.data

        window.removeEventListener('message', handleSandboxCommand)
        if (!data.hasError) resolve(data.logs)
        else reject(data.errors)
      }

      window.addEventListener('message', handleSandboxCommand)

      event.source.window.postMessage({ type: sandboxEvents.COMMAND_CLEAR_LOGS }, event.origin)
    })
  }

  const handledCommandNames = Object.values(commandNames)
  const commandHandlersEntries = handledCommandNames.map(name => [name, createHandlerFor(name)])
  const commands = Object.fromEntries(commandHandlersEntries)

  const handledAddonNames = Object.values(addonNames)
  const addonHandlersEntries = handledAddonNames.map(name => [name, createHandlerFor(name)])
  const addons = Object.fromEntries(addonHandlersEntries)

  const get = propName => props[propName]

  const term = Object.freeze({
    get,
    log,
    clear,
    commands,
    addons
  })

  try {
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

    const userMain = await restrictedEval(term)
    const result = userMain(term)
    await Promise.resolve(result)

    return []
  } catch (error) {
    let errorLogs = []

    if (error instanceof Array) errorLogs = error.map(String)
    else if (typeof error === 'string') errorLogs = [error]
    else if (error instanceof Error) errorLogs = [error.toString()]
    else errorLogs = ['Unexpected error was thrown.']

    return errorLogs
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

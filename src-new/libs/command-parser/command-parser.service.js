import { createClear } from './commands/clear/clear.command'
import { createUknown } from './commands/unknown/unknown.command'

class CommandParser {
  constructor(commands) {
    this.commands = commands
    this.handlers = {}
    this.listeners = {}
  }

  read(scriptRaw) {
    const [name, ...scriptArgs] = scriptRaw.trim().split(' ')
    const commandListeners = this.listeners[name] || []
    const createCommand = this.commands[name] || createUknown
    const handler = this.handlers[name]

    const command = createCommand(scriptRaw).prepare(scriptArgs)

    if (handler) command.setHandler(handler)
    commandListeners.forEach(listener => listener(command))

    return command
  }

  setHandlers(commandHandlers) {
    this.handlers = commandHandlers
  }

  addEventListener(eventName, listener) {
    const oldListeners = this.listeners[eventName] || []

    this.listeners = { ...this.listeners, [eventName]: [...oldListeners, listener] }
  }

  removeEventListener(eventName, listener) {
    const oldListeners = this.listeners[eventName] || []
    const filteredListeners = oldListeners.filter(oldListener => oldListener !== listener)
    const hasRemainingListeners = filteredListeners.length > 0

    if (!hasRemainingListeners) {
      delete this.listeners[eventName]
      return
    }

    this.listeners = { ...this.listeners, [eventName]: filteredEvents }
  }
}

export const commandParser = new CommandParser({
  clear: createClear
})

import { createClear } from './commands/clear/clear.command'
import { createUknown } from './commands/unknown/unknown.command'

class CommandParser {
  constructor(commands) {
    this.commands = commands
    this.listeners = {}
  }

  read(scriptRaw) {
    const [name, ...scriptArgs] = scriptRaw.trim().split(' ')
    const createCommand = this.commands[name] || createUknown
    const commandListeners = this.listeners[name] || []

    commandListeners.forEach(listener => listener())

    return createCommand(scriptRaw).execute()
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

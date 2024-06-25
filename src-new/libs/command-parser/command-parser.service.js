import { createCLEAR } from './commands/clear/clear.command'
import { createDOM } from './commands/dom/dom.command'
import { createUKNOWN } from './commands/unknown/unknown.command'
import EventListener from './sub-services/event-listener'

class CommandParser extends EventListener {
  constructor(commands) {
    super()

    this.commands = commands
    this.handlers = {}
  }

  read(scriptRaw) {
    const [name, ...scriptArgs] = scriptRaw.trim().split(' ')
    const createCommand = this.commands[name] || createUKNOWN
    const handler = this.handlers[name]

    const command = createCommand(scriptRaw).prepare(scriptArgs)

    if (handler) command.addEventListener('execute', handler)
    this.dispatchEvent(`before-${name}`, command)

    return command
  }

  setHandlers(commandHandlers) {
    this.handlers = commandHandlers
  }
}

export const commandParser = new CommandParser({
  clear: createCLEAR,
  dom: createDOM
})

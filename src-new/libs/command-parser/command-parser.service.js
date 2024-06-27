import { createCLEAR } from './commands/clear/clear.command'
import { createDOM } from './commands/dom/dom.command'
import { createERROR } from './commands/error/error.command'
import EventListener from './sub-services/event-listener'

class CommandParser extends EventListener {
  constructor(commands) {
    super()

    this.commands = commands
    this.handlers = {}
  }

  read(scriptRaw) {
    const [name, ...scriptArgs] = scriptRaw.trim().split(' ')
    const createCommand = this.commands[name]
    const handler = this.handlers[name]

    if (!createCommand) return createERROR(scriptRaw).mock({ title: '"Unkown command."' })

    const command = createCommand(scriptRaw).prepare(scriptArgs)
    this.dispatchEvent(`on-create-${name}`, command)

    if (handler) command.addEventListener('execute', handler)

    return command
  }

  setHandlers(commandHandlers) {
    this.handlers = commandHandlers
  }
}

export const commandParser = new CommandParser({
  clear: createCLEAR,
  dom: createDOM,
  error: createERROR
})

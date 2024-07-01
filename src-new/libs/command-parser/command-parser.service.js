import { getColor as C } from '@src/theme/theme.helpers'
import { splitBy } from './command-parser.helpers'
import { createCLEAR } from './commands/clear/clear.command'
import { createDOM } from './commands/dom/dom.command'
import { createERROR } from './commands/error/error.command'
import { createSTORAGE } from './commands/storage/storage.command'
import { createTABS } from './commands/tabs/tabs.command'
import EventListener from './sub-services/event-listener'

class CommandParser extends EventListener {
  constructor(commands) {
    super()

    this.commands = commands
    this.handlers = {}
  }

  read(scriptRaw) {
    return splitBy(scriptRaw, '&&').reduce((command, fragment) => {
      // if (fragment)
      //   else
      return this.readFragment(fragment)
    }, null)
  }

  readFragment(scriptRaw) {
    const [name, ...scriptArgs] = scriptRaw.trim().split(' ')
    const createCommand = this.commands[name]
    const handler = this.handlers[name]
    const cleanedName = name.replace('"', '\\"')

    if (!createCommand)
      return createERROR(scriptRaw).mock({
        title: `'The command "${C`bright-red`}${cleanedName}${C`red`}" is unrecognized.'`
      })

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
  storage: createSTORAGE,
  tabs: createTABS,
  error: createERROR
})
